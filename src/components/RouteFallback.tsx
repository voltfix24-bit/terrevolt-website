/**
 * Kleine, merkconforme route-fallback. Geen layout shift: vaste min-hoogte
 * en discrete lime spinner in TerreVolt-stijl. Toegankelijk via aria-label.
 */
export function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Pagina laden"
      className="min-h-[60vh] flex items-center justify-center bg-[#0d3b2e]/0"
    >
      <span
        className="inline-block h-6 w-6 rounded-full border-2 border-[#9ed42e]/30 border-t-[#9ed42e] animate-spin"
        aria-hidden="true"
      />
      <span className="sr-only">Bezig met laden…</span>
    </div>
  );
}
