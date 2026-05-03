import { Zap, Menu, X, HardHat, ArrowRight, Phone, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { company, telHref, mailHref } from "@/config/company";

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Sluit menu automatisch bij route-change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // "Werken bij" zit los — de overige links blijven plain text.
  const links = [
    { href: "/diensten", label: "Diensten" },
    { href: "/projecten", label: "Projecten" },
    { href: "/veiligheid", label: "Veiligheid" },
    { href: "/over", label: "Over ons" },
  ];

  // Sluit het menu automatisch zodra we op desktop komen.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setOpen(false);
    };
    handle(mql);
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  // Voorkom body-scroll achter open mobiel menu (iOS-safe).
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Focus trap + Escape, zonder focus glitches.
  useEffect(() => {
    if (!open) {
      // Bij sluiten: focus terug naar de toggle (of de eerder gefocuste element).
      const target = previouslyFocusedRef.current ?? toggleButtonRef.current;
      // requestAnimationFrame voorkomt dat focus race't met React's commit/unmount.
      const raf = requestAnimationFrame(() => {
        target?.focus({ preventScroll: true });
      });
      return () => cancelAnimationFrame(raf);
    }

    previouslyFocusedRef.current = (document.activeElement as HTMLElement | null) ?? null;

    const getFocusable = (): HTMLElement[] => {
      const root = menuRef.current;
      if (!root) return [];
      const selectors = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(",");
      return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
        (el) => !el.hasAttribute("hidden") && el.offsetParent !== null,
      );
    };

    // Initial focus op eerste interactieve element binnen het menu.
    const initRaf = requestAnimationFrame(() => {
      const focusable = getFocusable();
      focusable[0]?.focus({ preventScroll: true });
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const root = menuRef.current;

      // Als focus buiten het menu staat (bv. op de toggle), trek 'm naar binnen.
      if (!root || !active || !root.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus({ preventScroll: true });
        return;
      }

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(initRaf);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Skip to content — alleen zichtbaar bij toetsenbordfocus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#0d3b2e] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#9ed42e]"
      >
        Direct naar inhoud
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0d3b2e] rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#9ed42e]" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-xl text-[#0d3b2e] truncate leading-tight">TerreVolt BV</div>
                <div className="hidden xs:block text-[11px] sm:text-xs text-[#6c757d] leading-tight whitespace-nowrap">LS/MS-infrastructuur</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {links.map((l) => (
                <Link key={l.href} to={l.href} className="text-[#2d3436] hover:text-[#0d3b2e] transition-colors">
                  {l.label}
                </Link>
              ))}
              {/* Werken bij — pill style, subtiel prominent */}
              <Link
                to="/werken-bij"
                className="inline-flex items-center gap-2 bg-[#f0f7e6] text-[#0d3b2e] px-4 py-2.5 rounded-lg border border-[#9ed42e] hover:bg-[#9ed42e] hover:border-[#0d3b2e] transition-colors"
              >
                <HardHat className="w-4 h-4" strokeWidth={2.2} />
                <span>Werken bij</span>
              </Link>
              <Link
                to="/contact"
                className="bg-[#0d3b2e] text-white px-6 py-2.5 rounded-lg hover:bg-[#1a4a36] transition-colors"
              >
                Contact
              </Link>
            </nav>

            <button
              className="lg:hidden text-[#0d3b2e] inline-flex items-center justify-center w-11 h-11 -mr-2 flex-shrink-0 rounded-md hover:bg-[#f0f7e6] transition-colors"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobiel menu — full-viewport overlay onder de header, boven alle sticky subnavs/CTA's */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobiele navigatie"
          className="lg:hidden fixed left-0 right-0 top-16 sm:top-20 bottom-0 z-[9999] bg-white border-t border-gray-200 overflow-y-auto overscroll-contain animate-fade-in motion-reduce:animate-none"
          style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          <div className="container mx-auto px-4 sm:px-6 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))] flex flex-col">
            {/* Recruitment-card bovenaan */}
            <Link
              to="/werken-bij"
              onClick={() => setOpen(false)}
              className="block bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] text-white rounded-xl p-4 mb-4 border border-[#9ed42e]/40 transition-transform active:scale-[0.99] hover:from-[#1a4a36] hover:to-[#0d3b2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#9ed42e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <HardHat className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white text-base font-medium leading-snug line-clamp-2">
                    Werk mee aan LS/MS-infrastructuur
                  </div>
                  <div className="text-white/85 text-xs mt-1 leading-snug line-clamp-2">
                    Profielen voor monteurs, werkverantwoordelijken en ZZP-ploegen.
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[#9ed42e] text-sm mt-2 font-medium">
                    Werken bij bekijken <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Navigatielijst */}
            <ul className="flex flex-col divide-y divide-gray-100 border-y border-gray-100">
              {links.map((l) => {
                const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
                return (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 min-h-[56px] px-2 py-4 text-lg font-medium transition-colors active:bg-[#f8f9fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md ${
                        isActive ? "text-[#0d3b2e]" : "text-[#2d3436] hover:text-[#0d3b2e]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`block w-1 h-6 rounded-full transition-colors ${
                          isActive ? "bg-[#9ed42e]" : "bg-transparent"
                        }`}
                      />
                      <span className="flex-1">{l.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Contact CTA */}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="bg-[#0d3b2e] text-white px-6 rounded-xl text-center mt-5 min-h-[56px] flex items-center justify-center font-medium transition-all active:scale-[0.98] hover:bg-[#1a4a36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2"
            >
              Contact
            </Link>

            {/* Snelle contactregel */}
            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-[#6c757d] mb-2">Direct schakelen?</p>
              <div className="flex flex-col gap-1.5 items-center">
                <a
                  href={telHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-sm text-[#0d3b2e] hover:underline min-h-[36px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>{company.phone.display}</span>
                </a>
                <a
                  href={mailHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-sm text-[#0d3b2e] hover:underline min-h-[36px] break-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>{company.email}</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
