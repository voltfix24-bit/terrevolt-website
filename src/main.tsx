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
preloadLogo();

createRoot(document.getElementById("root")!).render(<App />);
