import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { getDb } from "@/lib/mongodb";
import type { Sort, Filter } from "mongodb";

const COOKIE_NAME = "cmtid";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type CommentDoc = {
  _id?: any;
  slug: string;
  token: string;
  name: string;
  message: string;
  createdAt: Date;
};

const NAME_CHARS = /^[A-Za-zÇĞİÖŞÜçğıöşü' -]+$/;
const BAD_NAMES = [
  "test",
  "guest",
  "anon",
  "anonymous",
  "admin",
  "user",
  "asdf",
  "qwerty",
];

function isLikelyRealName(raw: unknown) {
  const s = String(raw ?? "")
    .trim()
    .replace(/\s+/g, " ");
  if (!s) return false;
  if (s.length > 60) return false;
  if (!NAME_CHARS.test(s)) return false;
  const lower = s.toLowerCase();
  if (BAD_NAMES.includes(lower)) return false;
  const parts = s.split(" ");
  if (parts.length < 2) return false;
  if (parts.some((p) => p.length < 2)) return false;
  return true;
}
function toTitleCaseTR(raw: string) {
  return raw
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) =>
      w
        ? w[0].toLocaleUpperCase("tr-TR") +
          w.slice(1).toLocaleLowerCase("tr-TR")
        : w
    )
    .join(" ");
}

function sanitizeMessage(s: unknown) {
  let msg = String(s ?? "").trim();
  if (msg.length > 2000) msg = msg.slice(0, 2000);
  return msg;
}

const BAD_WORDS = [
  "salak",
  "aptal",
  "gerizekalı",
  "orospu",
  "sik",
  "s*ik",
  "piç",
  "amk",
  "aq",
  "yarrak",
  "mal",
  "oç",
  "çalıntı",
  "yapay zeka",
];
const badWordRe = new RegExp(`\\b(${BAD_WORDS.join("|")})\\b`, "i");
const urlRe = /(https?:\/\/|www\.)/i;

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const db = await getDb();
  const col = db.collection<CommentDoc>("comments");

  const filter: Filter<CommentDoc> = { slug: params.slug };
  const sort: Sort = { createdAt: -1 };

  const docs = await col.find(filter).sort(sort).limit(200).toArray();

  return NextResponse.json({
    items: docs.map((d) => ({
      id: d._id.toString(),
      name: d.name || "Anon",
      message: d.message,
      createdAt: d.createdAt.toISOString(),
    })),
  });
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const honeypot = String(body.website ?? "");
    if (honeypot) return NextResponse.json({ ok: true });

    const rawName = body.name ?? body.author;
    if (!isLikelyRealName(rawName)) {
      return NextResponse.json(
        { error: "Lütfen gerçek tam adınızı girin.." },
        { status: 400 }
      );
    }
    const name = toTitleCaseTR(String(rawName));

    const message = sanitizeMessage(body.message);
    if (!message)
      return NextResponse.json({ error: "Mesaj zorunludur." }, { status: 400 });
    if (urlRe.test(message))
      return NextResponse.json(
        { error: "Bağlantılar yasaktır.." },
        { status: 400 }
      );
    if (badWordRe.test(message))
      return NextResponse.json({ error: "Uygunsuz dil." }, { status: 400 });

    const store = cookies();
    let token = store.get(COOKIE_NAME)?.value;
    if (!token) token = randomUUID();

    const db = await getDb();
    const col = db.collection<CommentDoc>("comments");

    const since = new Date(Date.now() - ONE_DAY_MS);
    const exists = await col.findOne({
      slug: params.slug,
      token,
      createdAt: { $gt: since },
    });
    if (exists) {
      return NextResponse.json(
        { error: "Bu gönderiye günde bir yorum yazabilirsiniz.." },
        { status: 429 }
      );
    }

    const doc: CommentDoc = {
      slug: params.slug,
      token,
      name,
      message,
      createdAt: new Date(),
    };

    const { insertedId } = await col.insertOne(doc);

    const res = NextResponse.json(
      {
        ok: true,
        item: {
          id: insertedId.toString(),
          name,
          message,
          createdAt: doc.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );

    res.cookies.set({
      name: COOKIE_NAME,
      value: token,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}