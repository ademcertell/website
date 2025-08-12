import { NextResponse } from "next/server";
import { getMetrics, incMetric } from "@/lib/metrics";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const data = await getMetrics(params.slug);
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { type } = await req.json().catch(() => ({}));
  if (type !== "views" && type !== "likes") {
    return NextResponse.json({ error: "bad-type" }, { status: 400 });
  }
  const data = await incMetric(params.slug, type);
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
