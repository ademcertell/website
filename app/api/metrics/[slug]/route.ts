import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

type ViewDoc = {
  _id?: any;
  slug: string;
  count: number;
};

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const db = await getDb();
  const col = db.collection<ViewDoc>("views");

  const doc = await col.findOne({ slug: params.slug });
  const views = doc?.count ?? 0;

  return NextResponse.json({ views });
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const body = await req.json().catch(() => ({} as any));
  if (body?.type && body.type !== "views") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const db = await getDb();
  const col = db.collection<ViewDoc>("views");

  await col.updateOne(
    { slug: params.slug },
    { $inc: { count: 1 } },
    { upsert: true }
  );

  const doc = await col.findOne({ slug: params.slug });
  const views = doc?.count ?? 1;

  return NextResponse.json({ ok: true, views });
}
