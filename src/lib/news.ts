export interface NewsItem {
  title: string;
  url: string;
  date: string;
  source: string;
  summary: string;
  image?: string;
}

export interface NewsPayload {
  news: NewsItem[];
  lastUpdated: string;
}

interface ExaResult {
  title: string;
  url: string;
  publishedDate?: string;
  text?: string;
  image?: string;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Unknown";
  }
}

function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

function formatDate(value?: string): string {
  return (value ? new Date(value) : new Date()).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Fetch latest AI news via Exa. Returns null when unconfigured or on failure. */
export async function fetchAINews(): Promise<NewsPayload | null> {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          "latest breaking AI artificial intelligence news announcements launches",
        type: "auto",
        category: "news",
        num_results: 6,
        contents: {
          text: { max_characters: 500 },
        },
      }),
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.error("Exa API error:", response.status, await response.text());
      return null;
    }

    const data: { results: ExaResult[] } = await response.json();
    return {
      news: data.results.map((r) => ({
        title: r.title || "Untitled",
        url: r.url,
        date: formatDate(r.publishedDate),
        source: extractDomain(r.url),
        summary: truncate(r.text || "", 180),
        image: r.image,
      })),
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("News fetch error:", error);
    return null;
  }
}
