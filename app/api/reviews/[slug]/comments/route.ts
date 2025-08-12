import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "comments.json");

const COOKIE_NAME = "cmtid"; // anon ID
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type Comment = {
  id: string;
  token: string;     // anon token (cookie)
  name: string;
  message: string;
  createdAt: string; // ISO
};

function readDB(): Record<string, Comment[]> {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({}), "utf-8");
  return JSON.parse(fs.readFileSync(FILE, "utf-8") || "{}");
}
function writeDB(db: Record<string, Comment[]>) {
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2), "utf-8");
}

// TR harf, boşluk, kesme, tire
const NAME_CHARS = /^[A-Za-zÇĞİÖŞÜçğıöşü' -]+$/;
// blacklist
const BAD_NAMES = ["test", "guest", "anon", "anonymous", "admin", "user", "asdf", "qwerty"];

function isLikelyRealName(raw: unknown) {
  const s = String(raw ?? "").trim().replace(/\s+/g, " ");
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
    .map((w) => (w ? w[0].toLocaleUpperCase("tr-TR") + w.slice(1).toLocaleLowerCase("tr-TR") : w))
    .join(" ");
}

function sanitizeMessage(s: unknown) {
  let msg = String(s ?? "").trim();
  if (msg.length > 2000) msg = msg.slice(0, 2000);
  return msg;
}

const BAD_WORDS = [
  "salak","aptal","gerizekalı","orospu","sik","s*ik","piç","amk","aq","yarrak","mal","oç", "çalıntı", "yapay zeka"
];
const badWordRe = new RegExp(`\\b(${BAD_WORDS.join("|")})\\b`, "i");
const urlRe = /(https?:\/\/|www\.)/i;


export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const db = readDB();
  const list = (db[params.slug] ?? []).slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  return NextResponse.json({ items: list });
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const db = readDB();
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    const token = tokenMatch?.[1] ?? crypto.randomUUID();
    // Body
    const body = await req.json().catch(() => ({}));

    const honeypot = String(body.website ?? "");
    if (honeypot) {
      return NextResponse.json({ ok: true }, { status: 204 });
    }

    const rawName = body.name ?? body.author;
    if (!isLikelyRealName(rawName)) {
      return NextResponse.json({ error: "Lütfen gerçek tam adınızı girin.." }, { status: 400 });
    }
    const name = toTitleCaseTR(String(rawName));

    const message = sanitizeMessage(body.message);
    if (!message) return NextResponse.json({ error: "Mesaj zorunludur." }, { status: 400 });
    if (urlRe.test(message)) return NextResponse.json({ error: "Bağlantılar yasaktır.." }, { status: 400 });
    if (badWordRe.test(message)) return NextResponse.json({ error: "Uygunsuz dil." }, { status: 400 });

    const now = Date.now();
    const list = db[params.slug] ?? [];

    const lastFromToken = list
      .filter((c) => c.token === token)
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0];

    if (lastFromToken) {
      const age = now - new Date(lastFromToken.createdAt).getTime();
      if (age < ONE_DAY_MS) {
        return NextResponse.json(
          { error: "Bu gönderiye günde bir yorum yazabilirsiniz.." },
          { status: 429 }
        );
      }
    }

    const row: Comment = {
      id: `${now}_${Math.random().toString(36).slice(2, 8)}`,
      token,
      name,
      message,
      createdAt: new Date(now).toISOString(),
    };

    db[params.slug] = [row, ...list];
    writeDB(db);

    const res = NextResponse.json({ ok: true, item: row }, { status: 201 });
    res.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${token}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`
    );
    return res;
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}