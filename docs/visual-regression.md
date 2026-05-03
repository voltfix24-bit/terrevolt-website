# Visuele regressietesten (mobile vs desktop)

Twee Playwright-projecten in `playwright.config.ts` (`visual-mobile` op 390×844, `visual-desktop` op 1366×768) draaien `e2e/visual-regression.spec.ts` op alle publieke routes + `/admin/login`.

## Workflow

```bash
# Eerste run / na bewuste UI-wijziging: baselines genereren
npx playwright test visual-regression --update-snapshots

# Reguliere check
npx playwright test visual-regression
```

## Hoe het werkt

- Per route maken we een full-page screenshot per project.
- Snapshots staan in `e2e/visual-regression.spec.ts-snapshots/<naam>-<project>.png`.
- Tolerantie: `maxDiffPixelRatio: 0.02` (zie `playwright.config.ts`).
- Animaties, scroll-behavior en transitions worden tijdens de test uitgeschakeld om flakes te voorkomen.
- Web-fonts worden afgewacht via `document.fonts.ready`.

## Bij gefaalde diffs

1. Download het `visual-regression-diffs` artifact uit de GitHub Actions-run.
2. Vergelijk `*-actual.png` met `*-expected.png` en de `*-diff.png`.
3. Als de wijziging bedoeld is: commit nieuwe baselines met `--update-snapshots`.
4. Als de diff onbedoeld is: fix de regressie in de code.

## Routes

Aangepast in `e2e/visual-regression.spec.ts` (`ROUTES`-array). Admin-pagina's achter login zijn bewust niet opgenomen; voeg ze toe via een sessiefixture als dat later nodig is.
