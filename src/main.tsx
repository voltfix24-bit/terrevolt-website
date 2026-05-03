import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { redirectToCanonicalDomain } from "./lib/canonicalRedirect";

// Stuur bezoekers van *.lovable.app door naar het productiedomein vóór React mount.
redirectToCanonicalDomain();

createRoot(document.getElementById("root")!).render(<App />);
