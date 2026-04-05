import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 hours ISR

interface ExaResult {
  title: string;
  url: string;
  publishedDate?: string;
  author?: string;
  text?: string;
  highlights?: string[];
  image?: string;
}

interface ExaResponse {
  results: ExaResult[];
}

interface NewsItem {
  title: string;
  url: string;
  date: string;
  source: string;
  summary: string;
  image?: string;
}

function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return "Unknown";
  }
}

function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

export async function GET(request: Request) {
  const apiKey = process.env.EXA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "EXA_API_KEY not configured" },
      { status: 500 }
    );
  }

  // Verify cron secret for scheduled calls (optional security)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const url = new URL(request.url);
  const isCron = url.searchParams.get("source") === "cron";

  if (isCron && cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "latest breaking AI artificial intelligence news announcements launches",
        type: "auto",
        category: "news",
        num_results: 6,
        contents: {
          text: {
            max_characters: 500,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Exa API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch news from Exa", details: errorText },
        { status: response.status }
      );
    }

    const data: ExaResponse = await response.json();

    const news: NewsItem[] = data.results.map((result) => ({
      title: result.title || "Untitled",
      url: result.url,
      date: result.publishedDate
        ? new Date(result.publishedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
      source: extractDomain(result.url),
      summary: truncate(result.text || "", 180),
      image: result.image,
    }));

    return NextResponse.json(
      {
        news,
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch (error) {
    console.error("News fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
