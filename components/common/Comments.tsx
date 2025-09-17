"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Comment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

const NAME_MAX = 60;
const MSG_MAX = 2000;
const NAME_CHARS = /^[A-Za-zÇĞİÖŞÜçğıöşü' -]+$/;

function isLikelyRealName(raw: string) {
  const s = raw.trim().replace(/\s+/g, " ");
  if (!s) return false;
  if (s.length > NAME_MAX) return false;
  if (!NAME_CHARS.test(s)) return false;

  const lower = s.toLowerCase();
  const bad = ["test", "guest", "anon", "anonymous", "admin", "user", "asdf"];
  if (bad.includes(lower)) return false;

  const parts = s.split(" ");
  if (parts.length < 2) return false;
  if (parts.some((p) => p.length < 2)) return false;

  return true;
}

function toTitleCase(raw: string) {
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

export default function Comments({ slug }: { slug: string }) {
  const [items, setItems] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [sending, setSending] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [msgError, setMsgError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(`/api/reviews/${slug}/comments`, {
        cache: "no-store",
      });
      const j = await r.json();
      setItems(j.items ?? []);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const nameValid = useMemo(() => isLikelyRealName(name), [name]);
  const msgValid = useMemo(
    () => !!message.trim() && message.length <= MSG_MAX,
    [message]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameValid) {
      setNameError(
        "Lütfen gerçek tam adınızı girin (en az iki kelime, sadece harfler)."
      );
      nameRef.current?.focus();
      return;
    } else {
      setNameError(null);
    }

    if (!msgValid) {
      setMsgError("Yorum zorunludur ve 2000 karakterden az olmalıdır.");
      msgRef.current?.focus();
      return;
    } else {
      setMsgError(null);
    }

    setSending(true);

    const optimistic: Comment = {
      id: "__optimistic__" + Math.random(),
      name: toTitleCase(name),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [optimistic, ...prev]);

    try {
      const r = await fetch(`/api/reviews/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: toTitleCase(name), message, website }),
      });
      if (!r.ok) throw new Error();
      const j = await r.json();
      setItems((prev) => [
        j.item,
        ...prev.filter((x) => x.id !== optimistic.id),
      ]);
      setMessage("");
    } catch {
      setItems((prev) => prev.filter((x) => x.id !== optimistic.id));
      alert("Yorum gönderilemedi.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="mt-12">
      <h3 className="mb-3 text-lg font-heading text-foreground">Yorum</h3>

      <form
        onSubmit={onSubmit}
        className="space-y-3 rounded-xl border border-white/10 bg-card/60 p-4"
      >
        <div className="flex gap-3">
          <div className="w-full sm:w-1/2">
            <input
              ref={nameRef}
              className={`w-full min-w-[200px] rounded-md border px-3 py-2 text-sm outline-none
                bg-black/30 border-white/10 focus:border-white/30
                ${
                  nameError ? "border-rose-400/50 focus:border-rose-400/70" : ""
                }`}
              placeholder="İsim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setName((n) => toTitleCase(n))}
              maxLength={NAME_MAX}
              aria-invalid={!!nameError}
              aria-describedby="name-error"
              required
            />
            {nameError ? (
              <p id="name-error" className="mt-1 text-xs text-rose-300">
                {nameError}
              </p>
            ) : !name || nameValid ? null : (
              <p className="mt-1 text-xs text-amber-300">
                İpucu: En az iki kelime girin, sadece harfler kullanın.
              </p>
            )}
          </div>

          <input
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="website"
          />
        </div>

        <div>
          <textarea
            ref={msgRef}
            className={`min-h-[96px] w-full rounded-md border px-3 py-2 text-sm outline-none
              bg-black/30 border-white/10 focus:border-white/30
              ${msgError ? "border-rose-400/50 focus:border-rose-400/70" : ""}`}
            placeholder="Düşüncelerinizi paylaşın…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MSG_MAX}
            aria-invalid={!!msgError}
            aria-describedby="msg-error"
            required
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {message.length}/{MSG_MAX}
            </span>
            {msgError && (
              <span id="msg-error" className="text-xs text-rose-300">
                {msgError}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={sending}
            className="rounded-md bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20 disabled:opacity-50"
          >
            {sending ? "Gönderiliyor..." : "Yorumu Gönder"}
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Yükleniyor</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Henüz yorum yok.</p>
        ) : (
          items.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-white/10 bg-card/60 p-4"
            >
              <div className="mb-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/90">
                  {c.name || "Guest"}
                </span>
                <span className="mx-2">•</span>
                {new Date(c.createdAt).toLocaleString()}
              </div>
              <p className="whitespace-pre-wrap text-sm">{c.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}