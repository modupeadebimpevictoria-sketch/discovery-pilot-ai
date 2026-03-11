const PREFIX = "sb-cache:";
const TTL = 1000 * 60 * 60; // 1 hour

interface CacheEntry<T> {
  data: T;
  ts: number;
}

export function setCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ data, ts: Date.now() } as CacheEntry<T>));
  } catch {
    // storage full — silently ignore
  }
}

export function getCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.ts > TTL) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}
