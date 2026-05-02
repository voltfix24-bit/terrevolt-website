# Mobiele preview-testplan — `/veiligheid`

Doel: snel en herhaalbaar controleren of alle veiligheidstekst (hero,
stappen, kaarten, statement, locatie-eisen, FAQ, CTA) netjes afbreekt op
de drie kritieke breakpoints **375 px**, **414 px** en **640 px**, zonder
horizontale overflow, zonder weeswoorden ("orphans") en zonder afgekapte
inhoud.

---

## 0. Voorbereiding (1×)

1. Open de preview en navigeer naar `/veiligheid`.
2. Open de DevTools van de browser (`F12` of `Cmd/Ctrl + Shift + I`).
3. Activeer **Device Toolbar** (`Cmd/Ctrl + Shift + M` in Chrome/Edge,
   of de telefoon-/tablet-knop in Lovable boven de preview).
4. Zet **Throttling** op "No throttling" zodat lay-out niet schokt.
5. In Console: plak onderstaand snippet om bij elk testpunt direct te zien
   óf er ergens horizontale overflow ontstaat (markeert overschrijdende
   elementen rood):

```js
   // Toggle: roep `window.__hl()` opnieuw aan om uit te zetten.
   window.__hl = (() => {
     let on = false;
     return () => {
       on = !on;
       document.querySelectorAll("*").forEach((el) => {
         const r = el.getBoundingClientRect();
         if (r.right > document.documentElement.clientWidth + 0.5) {
           el.style.outline = on ? "2px solid red" : "";
         } else if (!on) {
           el.style.outline = "";
         }
       });
       console.log(on ? "Overflow highlight AAN" : "UIT");
     };
   })();
   __hl();
```

> Telkens na het wijzigen van breedte: roep `__hl()` twee keer aan om de
> markeringen te verversen.

---

## 1. Algemene checks per breakpoint

Voor **elk** van de drie viewports onderstaand rondje doen:

| # | Check | Verwacht |
|---|---|---|
| 1.1 | Horizontale scrollbar onderaan? | **Geen** scrollbar; pagina past in viewport |
| 1.2 | Console-snippet `__hl()` markeert iets? | Geen rood-omlijnde elementen |
| 1.3 | Tekst valt buiten de cards/secties? | Niets steekt uit `border` of `bg` van de container |
| 1.4 | Lange compounds zoals *Werkverantwoordelijke*, *Installatieverantwoordelijke*, *Veiligheidswerkinstructies*, *Middenspanningsmonteur*, *netbeheerderseisen* breken op een natuurlijke morfeemgrens af | Bijv. "Werk-/verant-/woor-/de-/lijke" — niet "Werkverantwoorde-/lijke" of midden in een lettergreep |
| 1.5 | Geen losse em-dash (`—`) of streepjeswoord aan begin van regel | Em-dash blijft kleven aan voorgaand woord |
| 1.6 | Geen losse leestekens of nummers ("1.", ":") als enige op een regel | Blijven bij hun woord |
| 1.7 | Subnav-chips (Aanpak / BEI & VWI / Rollen / Locatie-eisen / FAQ / Contact) blijven horizontaal scrollbaar binnen de balk | Geen overflow naar rechts buiten viewport |
| 1.8 | Sticky header + sticky subnav blijven leesbaar bij scroll | Geen overlap of onleesbare achtergrond |

---

## 2. Sectie-specifiek

### 2.1 Hero
- Titel "Veiligheid binnen elektrotechnische infrastructuur" breekt netjes op `hyphens-nl`.
- Beide CTA's ("Onze veiligheidsaanpak" / "Veilige voorbereiding bespreken") staan **onder elkaar** op 375/414, **naast elkaar** op 640.
- Knoptekst past binnen de knop, geen wrap binnen één knop.

### 2.2 Veiligheidsaanpak (5 stappen)
- 5 cards staan onder elkaar (1 kolom) op 375/414, 2 kolommen op 640.
- Genummerde badge (1–5) hangt centraal boven elke card; valt niet buiten de bovenrand.
- Paragraaf-tekst gebruikt `text-[15px] leading-[1.7]` op mobiel — controle: tekst voelt "luchtig", niet samengeperst.
- Geen woord steekt uit de card-padding rechts.

### 2.3 BEI & VWI / Voorbereiding-Uitvoering-Oplevering (4 cards)
- Cards staan onder elkaar op 375/414, 2 kolommen op 640.
- Lange titels ("Toolboxen & kennisdeling") wrappen netjes op één afbreekpunt.
- Label-pillen ("Veiligheid als gedrag", "Veilige werkplek", etc.) blijven binnen de card en breken niet.

### 2.4 Bevoegdheden / Rollen (4 certs)
- Cards in 1 kolom op 375/414, 2 op 640.
- "WV / AVP / VP / VOP" subtitle blijft op één regel of breekt netjes na een `/`.
- "NEN 1010 / 3140 / 3840" idem.

### 2.5 Locatie-eisen (4 cards)
- 1 kolom op 375/414, 2 op 640.
- "Werkvergunningen & overdracht" titel wrapt netjes; "Bedrijfsspecifieke procedures" gebruikt soft-hyphen (controleer: zachte afbreking aanwezig in de tekstkolom).

### 2.6 FAQ-accordion (6 items)
- Triggers (vragen) zijn comfortabel aanklikbaar (≥ 44 px hoogte).
- Vraag wrapt naar maximaal 2–3 regels op 375; chevron blijft rechts uitgelijnd.
- Antwoord opent zonder horizontale schok.
- Lange compounds in antwoorden (FAQ "Wie is verantwoordelijk?" en "Is VCA verplicht?") breken op morfeemgrens.
- Em-dash in "We doen het veilig, of we doen het niet — geen project..." houdt het streepje bij het voorgaande woord.

### 2.7 Statement-blok ("Iedereen veilig thuis")
- Citaat staat gecentreerd; breekt op natuurlijke punten.
- Em-dash + "met aandacht voor..." valt niet als orphan op nieuwe regel.

### 2.8 CTA onderaan
- Hele zin ("Een LS/MS-project veilig voorbereiden?") wrapt op `hyphens-nl`.
- Knop "Project bespreken" past binnen de viewport, ook op 375.

---

## 3. Toetsenbord- en deeplink-checks (alle breedtes)

| # | Actie | Verwacht |
|---|---|---|
| 3.1 | Tab door subnav-chips | Lime focus-ring zichtbaar; volgorde links → rechts |
| 3.2 | Klik op subnav "FAQ" | Smooth scroll; FAQ-titel staat **onder** sticky header + subnav, niet eronder verstopt |
| 3.3 | Open `/veiligheid#rollen` direct in adresbalk + reload | Pagina scrollt na load naar Rollen-grid met juiste offset |
| 3.4 | Open `/veiligheid#faq`, klik daarna een chip | Hash in URL update; geen dubbele scroll-jump |
| 3.5 | Tab in geopende FAQ-vraag → Enter | Vraag opent/sluit; Space doet hetzelfde |
| 3.6 | ↓ / ↑ binnen Accordion | Spring tussen vragen |
| 3.7 | `prefers-reduced-motion: reduce` (DevTools → Rendering → Emulate CSS media) | Scroll springt direct, geen animatie |

---

## 4. Edge-cases om bewust te triggeren

1. **Zoom 200 %** in browser op 375-viewport → tekst moet nog leesbaar zijn, geen knoppen of cards die overlap maken.
2. **iOS Safari "Reader-stijl" font-size +2** simulatie (DevTools → Settings → Inspector → Default browser font ophogen) → check dat cards meegroeien zonder overflow.
3. **Lange URL-hash** (`/veiligheid#een-niet-bestaand-id`) → geen scroll, geen JS-error in console.
4. **Snel klikken** op meerdere subnav-chips achter elkaar → laatste klik wint, geen race-condition.
5. **Landschap-oriëntatie** op 375×667 (= 667×375) → header-offset blijft kloppen, content begint onder header.

---

## 5. Snelle slaag/zak-criteria

- ✅ **Slaag** wanneer: geen overflow, geen leesbaarheidsklachten, alle deeplinks landen correct, alle FAQ's bedienbaar met toetsenbord.
- ❌ **Zak** wanneer: één enkel woord buiten een card valt, een chevron overlapt tekst, een deeplink eindigt **boven** de header, of een lange compound midden in een lettergreep breekt.

---

## 6. Hulpcommando's (DevTools Console)

```js
// Forceer alle FAQ-items open om wrapping in antwoorden te zien:
document.querySelectorAll('[data-state="closed"] > button').forEach((b) => b.click());

// Markeer elk element met soft-hyphen voor visuele controle:
document.body.innerHTML = document.body.innerHTML.replaceAll(
  "\u00AD",
  '<span style="background:yellow">·</span>'
);
// (alleen voor visuele check — refresh om te herstellen)

// Toon huidige viewport-breedte:
console.log("viewport:", document.documentElement.clientWidth, "px");
```

---

## 7. Logvoorbeeld (vul in tijdens testen)

| Breakpoint | Overflow? | Lange compound OK? | Em-dash orphan? | FAQ deeplink offset OK? | Notes |
|---:|:---:|:---:|:---:|:---:|---|
| 375 px | ☐ | ☐ | ☐ | ☐ | |
| 414 px | ☐ | ☐ | ☐ | ☐ | |
| 640 px | ☐ | ☐ | ☐ | ☐ | |

Bewaar dit ingevulde tabel onder `docs/test-runs/veiligheid-YYYY-MM-DD.md`
voor traceerbaarheid.

---

## 8. Geautomatiseerde overflow-test (Playwright)

Naast de handmatige checks hierboven draait er een Playwright-spec die
`/veiligheid` op **375 / 414 / 640 px** laadt en programmatisch elk
element controleert dat buiten de viewport-rechterrand valt (met
uitsluiting van bewust scrollende containers zoals de subnav-chips).

**Eerste keer (lokaal):**

```bash
npm run test:e2e:install   # download Chromium
npm run test:e2e           # bouwt app, start preview, draait spec
```

**Output** (per run, in `test-results/veiligheid-overflow/`):

- `report.json` — ruwe data per breakpoint (offenders, scrollWidth, ...)
- `report.md`   — leesbaar overzicht met tabel per breakpoint
- `veiligheid-375.png` / `-414.png` / `-640.png` — full-page screenshots

De test slaagt alleen wanneer **alle drie** breakpoints geen
horizontale scroll vertonen én geen enkel element rechts buiten de
viewport valt. Faalt er één, dan zie je in de assertion én in
`report.md` exact welke tag/id/tekst het probleem veroorzaakt.

---

## 9. iOS Safari-specifieke checks

iOS Safari (iPhone, met name iOS 16/17/18 op SE 2/3, 13 mini, 14, 15)
heeft een aantal afwijkingen t.o.v. Chrome DevTools-emulatie. Loop deze
checks expliciet door op een **echt toestel** of via Xcode Simulator
(Simulator → Hardware → Device → iPhone SE 3rd gen + iPhone 15).

### 9.1 Letter-spacing & kerning

iOS Safari past `letter-spacing` ietsje strakker toe dan Chrome, en
combineert dat met automatische *kerning* die op `-webkit-` prefix kan
verschillen.

| # | Check | Verwacht |
|---|---|---|
| 9.1.1 | Hero-titel "Veiligheid binnen elektrotechnische infrastructuur" — meet visueel of `tracking` (letter-spacing) niet té krap is | Letters raken elkaar niet; geen "samengeplakte" `rn`/`cl`/`li` combinaties |
| 9.1.2 | Subnav-chips ("Aanpak", "BEI & VWI", "Rollen", "Locatie-eisen", "FAQ", "Contact") | Tekst staat horizontaal gecentreerd in pill, geen 1px afsnijding rechts |
| 9.1.3 | Hoofdletter-knoptekst ("PROJECT BESPREKEN" / kapitalen) — als aanwezig | Spatie tussen letters voelt gelijk; geen "kleeftekst" tussen `M` en `B` |
| 9.1.4 | Stapnummer-badges (1–5) | Cijfer staat optisch gecentreerd; geen lichte verschuiving naar links door font-metrics |
| 9.1.5 | Em-dash `—` houdt rechts en links 1 spatiebreedte aan, **ook na font-fallback** | Niet ingedrukt tegen voorgaande/volgende woord |

**Hulp**: forceer `text-rendering: geometricPrecision` tijdelijk via
DevTools om te zien of een verschil door font-hinting komt:

```js
document.documentElement.style.textRendering = "geometricPrecision";
```

### 9.2 Font fallback (system stack)

Als de webfont nog niet geladen is (eerste bezoek, slechte verbinding,
of bij `font-display: swap`), valt iOS Safari terug op **San Francisco**
(`-apple-system`). SF heeft bredere x-hoogte dan bv. Inter/Geist, dus
lay-outs kunnen kortstondig wider/hoger renderen → mogelijke overflow.

| # | Check | Verwacht |
|---|---|---|
| 9.2.1 | Network-throttling **Slow 3G** + harde reload op `/veiligheid` | Tijdens FOUT/FOIT geen horizontale scroll; cards rekken hooguit verticaal |
| 9.2.2 | Disable webfonts (Safari → Develop → Disable Web Fonts) | Pagina blijft leesbaar; geen knoppen die uit hun container vallen |
| 9.2.3 | Stappenkaart-titels en FAQ-vragen met SF-fallback | Wrappen op natuurlijke woordgrens; geen ineens verdubbelde regel die buiten card valt |
| 9.2.4 | `font-feature-settings` (zoals tabular-nums op stapnummers) werkt of degradeert stil | Cijfers blijven gelijke breedte; geen zichtbare jump bij swap |
| 9.2.5 | Subtiele cursive / italic in citaat ("Iedereen veilig thuis") | Italic fallback (`-apple-system` italic) breekt geen baseline-uitlijning |

**Hulp** — simuleer alleen system stack:

```js
const s = document.createElement("style");
s.textContent = `* { font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, sans-serif !important; }`;
document.head.appendChild(s);
// verwijder weer: s.remove();
```

### 9.3 Veilige scroll-offset op kleine schermen

iOS Safari heeft drie eigenaardigheden die de offset van anchor-links
(deeplinks naar `#aanpak`, `#faq`, etc.) breken:

1. **Dynamische URL-bar** die in/uitschuift → `100vh` ≠ visible height,
   en `scrollIntoView` kan een doel **achter** de URL-bar parkeren.
2. **Safe-area insets** (notch / Dynamic Island / home indicator) →
   `env(safe-area-inset-top)` moet meegerekend worden in de
   sticky-header-offset, anders verschuift de landing 20–47 px.
3. **Rubber-band scroll** + momentum → een geplande
   `window.scrollTo({ behavior: "smooth" })` kan worden ingehaald door
   de inertie van een eerdere swipe.

| # | Check | Verwacht |
|---|---|---|
| 9.3.1 | Open `/veiligheid#faq` direct vanuit Safari adresbalk (cold load) | FAQ-titel landt **onder** sticky header **én** safe-area top; niet half eronder |
| 9.3.2 | Scroll diep, tik dan op subnav-chip "Rollen" terwijl URL-bar **uitgevouwen** is | Doel staat onder de zichtbare header — meet met vinger tegen scherm |
| 9.3.3 | Scroll tot URL-bar **inklapt**, tik vervolgens op chip "Locatie-eisen" | Doel blijft correct uitgelijnd; geen sprong onder de header |
| 9.3.4 | Roteer naar landschap (notch links) op iPhone 14/15 | Safe-area-inset-left/right wordt gerespecteerd; subnav valt niet onder de notch |
| 9.3.5 | Tik op chip terwijl pagina nog momentum-scrollt na een swipe | Smooth-scroll wint; eindpositie klopt (geen "halverwege" stop) |
| 9.3.6 | Pinch-zoom 150% → tik op chip "Contact" | Scroll-target blijft binnen zichtbaar gebied; pagina re-zoomt niet ongevraagd |
| 9.3.7 | iOS instelling **"Reduceer beweging"** AAN | Scroll springt direct, geen smooth-animatie, doel nog steeds met juiste offset |
| 9.3.8 | Safari "Vraag bureaubladsite" UIT (mobiel) vs AAN | In mobiele modus klopt de offset; in desktop-modus mag een kleine afwijking, maar geen overlap |

**Hulpcommando** — visualiseer de werkelijke header-offset:

```js
// Plak in Safari's Web Inspector (Mac → Safari → Develop → iPhone)
const header = document.querySelector("header");
const sub = document.querySelector('[data-subnav], nav[aria-label*="ectie" i]');
const totalOffset =
  (header?.getBoundingClientRect().height || 0) +
  (sub?.getBoundingClientRect().height || 0);
console.log("Sticky offset:", totalOffset, "px");

// Teken een rode lijn op die hoogte:
const line = document.createElement("div");
Object.assign(line.style, {
  position: "fixed", left: "0", right: "0",
  top: totalOffset + "px", height: "2px",
  background: "red", zIndex: "9999", pointerEvents: "none",
});
document.body.appendChild(line);
```

Anchor-doel hoort **net onder** die rode lijn te landen na een
deeplink. Valt het erboven → offset te klein. Valt het ruim eronder →
offset te groot (ruimte verspild).

### 9.4 Slaag/zak — iOS Safari

- ✅ **Slaag**: alle 9.1–9.3 checks groen op iPhone SE 3 (375px) **én**
  iPhone 15 (393px) **én** iPhone 15 Pro Max (430px), zowel met als
  zonder webfont, en zowel met uit- als ingeklapte URL-bar.
- ❌ **Zak**: één deeplink landt achter de header, één woord/chip valt
  buiten viewport in system-font fallback, of letter-spacing zorgt voor
  visueel kleeftekst in een knop of titel.

---

## 10. CI — automatische runs op elke push

`.github/workflows/e2e.yml` draait Playwright automatisch op elke push
en pull request. Eén Ubuntu-job installeert **Chromium + WebKit** en
voert vier projecten uit:

| Project | Engine | Device |
|---|---|---|
| `chromium-mobile` | Chromium | Pixel 5 |
| `mobile-safari-iphone-se` | **WebKit (= iOS Safari)** | iPhone SE |
| `mobile-safari-iphone-12` | **WebKit (= iOS Safari)** | iPhone 12 |
| `mobile-safari-iphone-14-pro-max` | **WebKit (= iOS Safari)** | iPhone 14 Pro Max |

> WebKit op Linux is exact dezelfde rendering-engine als iOS Safari —
> letter-spacing, font-fallback en layout-quirks gedragen zich identiek.
> Dat dekt sectie 9 uit dit testplan af zonder dat er een Mac/iPhone
> nodig is in CI.

### Artefacten per run

Elke workflow-run upload drie artifacts (zichtbaar onderaan de
GitHub Actions run-pagina, 14–30 dagen retentie):

- **`playwright-report`** — interactieve HTML-rapport (`npx playwright show-report` lokaal).
- **`veiligheid-overflow-report`** — per project een eigen submap met
  `report.md`, `report.json` en de drie full-page screenshots
  (375 / 414 / 640 px).
- **`playwright-test-results`** *(alleen bij failure)* — traces, video's
  en screenshots voor debugging.

### Lokaal hetzelfde commando draaien

```bash
# Eénmalig: browsers installeren
npx playwright install --with-deps chromium webkit

# Alle projecten (zoals CI)
CI=true npx playwright test

# Alleen iOS Safari op iPhone SE
npx playwright test --project=mobile-safari-iphone-se
```

### Faalcriterium

Een run faalt zodra **één** project op **één** breakpoint horizontale
overflow vindt of een element rechts buiten de viewport laat vallen.
De PR-check is daarmee een harde poort tegen mobiele regressies — ook
op iOS Safari, niet alleen Chromium.
