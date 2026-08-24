import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import logoSrc from "@/assets/terrevolt-logo.png";
import { redirectMailDomainToSite } from "@/lib/mailDomainRedirect";

// Maildomein is alleen een afzenderdomein — bezoekers horen op terrevolt.nl.
redirectMailDomainToSite();


// Preload het header-logo zodat de browser 't parallel met JS/CSS ophaalt.
// Vite hash't de filename → langetermijn-cache (immutable) is automatisch.
function preloadLogo() {
  if (typeof document === "undefined") return;
  const id = "preload-terrevolt-logo";
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "preload";
  link.as = "image";
  link.href = logoSrc;
  link.fetchPriority = "high";
  document.head.appendChild(link);
}

function prefillContactLocationFromQuery() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const rawPlace = params.get("plaats") || params.get("city");
  if (!rawPlace) return;

  const placeLabels: Record<string, string> = {
    amsterdam: "Amsterdam",
    "amsterdam-noord": "Amsterdam-Noord",
    amstelveen: "Amstelveen",
    diemen: "Diemen",
    zaandam: "Zaandam",
    haarlem: "Haarlem",
    hoofddorp: "Hoofddorp",
    almere: "Almere",
    utrecht: "Utrecht",
  };

  const place = placeLabels[rawPlace.toLowerCase()] || rawPlace
    .replace(/[-_]+/g, " ")
    .replace(/\b\p{L}/gu, (char) => char.toUpperCase());

  const fillLocation = () => {
    const field = document.querySelector<HTMLInputElement>('input[name="location"]');
    if (!field || field.value) return false;
    field.value = place;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  };

  if (fillLocation()) return;
  const observer = new MutationObserver(() => {
    if (fillLocation()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

preloadLogo();
prefillContactLocationFromQuery();

createRoot(document.getElementById("root")!).render(<App />);
