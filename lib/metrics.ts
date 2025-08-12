import fs from "fs/promises";
import path from "path";

type Counters = { views: number; likes: number };
type MetricsDB = Record<string, Counters>;

const file = path.join(process.cwd(), "data", "metrics.json");

async function readDB(): Promise<MetricsDB> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

async function writeDB(db: MetricsDB) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(db, null, 2), "utf8");
}

export async function getMetrics(slug: string): Promise<Counters> {
  const db = await readDB();
  return db[slug] ?? { views: 0, likes: 0 };
}

export async function incMetric(slug: string, type: "views" | "likes") {
  const db = await readDB();
  const current = db[slug] ?? { views: 0, likes: 0 };
  current[type] += 1;
  db[slug] = current;
  await writeDB(db);
  return current;
}
