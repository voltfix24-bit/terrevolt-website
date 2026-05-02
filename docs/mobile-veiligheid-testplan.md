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
