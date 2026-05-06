import { lazy, type ComponentType } from "react";

/**
 * Wrapt React.lazy met retry + één-malige hard reload bij stale chunks.
 *
 * Na een nieuwe deploy verwijzen oude tabs naar oude hashed JS-bestanden
 * die niet meer bestaan → "Importing a module script failed" / ChunkLoadError.
 * We doen dan één keer een full reload zodat de browser de nieuwe index.html
 * (met nieuwe chunk-namen) ophaalt.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    const STORAGE_KEY = "lovable:chunk-reloaded";
    try {
      const mod = await factory();
      if (typeof window !== "undefined") sessionStorage.removeItem(STORAGE_KEY);
      return mod;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const isChunkError =
        /Importing a module script failed|Failed to fetch dynamically imported module|ChunkLoadError|Loading chunk \d+ failed/i.test(
          message,
        );

      if (isChunkError && typeof window !== "undefined") {
        const alreadyReloaded = sessionStorage.getItem(STORAGE_KEY);
        if (!alreadyReloaded) {
          sessionStorage.setItem(STORAGE_KEY, "1");
          window.location.reload();
          // Geef een nooit-resolvende promise terug zodat React niets rendert
          // tijdens de reload.
          return new Promise<{ default: T }>(() => {});
        }
      }
      throw err;
    }
  });
}
