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

/**
 * Exa returns page text that opens with the headline, a markdown "# heading" and
 * metadata lines (Published:, Source:, bylines, dates). Keep only real prose lines.
 */
function cleanSummary(text: string, title: string): string {
  const norm = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const titleKey = norm(title).slice(0, 40);
  const prose = (text || "")
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim().replace(/^[-*>•]\s+/, ""))
    .filter((line) => {
      if (line.length < 60) return false; // bylines, dates, source names
      if (/^#/.test(line)) return false; // markdown headings
      if (/^(published|source|language|author|by|image credits?|photo)\b/i.test(line)) return false;
      if (titleKey && norm(line).startsWith(titleKey)) return false; // repeated headline
      return true;
    })
    .join(" ");
  return truncate(prose, 180);
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
          text: { max_characters: 1500 },
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
        summary: cleanSummary(r.text || "", r.title || ""),
        image: r.image,
      })),
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("News fetch error:", error);
    return null;
  }
}
