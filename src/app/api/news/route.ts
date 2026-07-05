import { NextResponse } from "next/server";
import { fetchAINews } from "@/lib/news";

export const revalidate = 86400; // 24 hours ISR

export async function GET(request: Request) {
  // Verify cron secret for scheduled calls (optional security)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const url = new URL(request.url);
  const isCron = url.searchParams.get("source") === "cron";

  if (isCron && cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await fetchAINews();
  if (!payload) {
    return NextResponse.json(
      { error: "News unavailable" },
      { status: 500 }
    );
  }

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
