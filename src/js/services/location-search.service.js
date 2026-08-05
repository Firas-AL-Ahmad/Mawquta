import { CONFIG } from "../config/app.config.js";

export async function searchCitySuggestions(query, options = {}) {
  const q = String(query || "").trim();
  if (q.length < 3) return [];

  const {
    maxRows = 8,
    lang = CONFIG.LOCALE.split("-")[0],
    signal,
  } = options;

  try {
    const url = new URL("/api/geocode", window.location.origin);
    url.searchParams.set("q", q);
    url.searchParams.set("limit", String(maxRows));
    url.searchParams.set("lang", lang);

    const response = await fetch(url.toString(), { signal });
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!data?.ok) {
      return [];
    }

    return Array.isArray(data.results) ? data.results : [];
  } catch {
    return [];
  }
}
