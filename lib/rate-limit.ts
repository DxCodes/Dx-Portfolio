// One-send-per-window limiter.
// Uses Upstash Redis (REST) when configured, so the limit holds across all serverless
// instances on Vercel. Falls back to in-memory, which is fine for local dev but resets on
// cold starts and isn't shared between instances.

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const memory = new Map<string, number>();

async function redis<T>(command: (string | number)[]): Promise<T> {
  const res = await fetch(REDIS_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  return ((await res.json()) as { result: T }).result;
}

/**
 * Tries to claim every key for `windowSec` seconds.
 * Returns 0 when all keys were free (and are now claimed), otherwise the seconds left
 * on the longest-blocked key. Nothing is claimed when any key is blocked.
 */
export async function claim(keys: string[], windowSec: number): Promise<number> {
  if (REDIS_URL && REDIS_TOKEN) {
    const ttls = await Promise.all(keys.map((k) => redis<number>(["TTL", k])));
    const wait = Math.max(0, ...ttls);
    if (wait > 0) return wait;
    await Promise.all(keys.map((k) => redis(["SET", k, "1", "EX", windowSec])));
    return 0;
  }

  const now = Date.now();
  const wait = Math.max(0, ...keys.map((k) => Math.ceil(((memory.get(k) ?? 0) - now) / 1000)));
  if (wait > 0) return wait;
  for (const k of keys) memory.set(k, now + windowSec * 1000);
  return 0;
}

/** Frees keys again, e.g. when the send failed and the visitor should be able to retry. */
export async function release(keys: string[]): Promise<void> {
  if (REDIS_URL && REDIS_TOKEN) {
    await redis(["DEL", ...keys]);
    return;
  }
  for (const k of keys) memory.delete(k);
}
