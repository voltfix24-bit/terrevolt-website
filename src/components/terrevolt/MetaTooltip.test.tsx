import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act, fireEvent, createEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MetaTooltip } from "./MetaTooltip";

/**
 * Helper: simuleer een touch-tap. jsdom kent geen native PointerEvent,
 * dus we maken handmatig een event aan dat `pointerType: "touch"` doorgeeft.
 */
function tap(element: Element) {
  const evt = createEvent.pointerDown(element, { bubbles: true });
  Object.defineProperty(evt, "pointerType", { value: "touch" });
  fireEvent(element, evt);
}

describe("MetaTooltip — mobiele interacties", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("toont de tooltip bij tap op de badge", () => {
    render(
      <MetaTooltip label="Beschikbaarheid: per direct">
        <span data-testid="badge">Badge</span>
      </MetaTooltip>,
    );

    const tip = screen.getByRole("tooltip", { hidden: true });
    expect(tip).toHaveAttribute("aria-hidden", "true");

    tap(screen.getByTestId("badge"));

    expect(tip).toHaveAttribute("aria-hidden", "false");
    expect(tip).toHaveTextContent("Beschikbaarheid: per direct");
  });

  it("sluit de tooltip wanneer er buiten de badge wordt getapt", () => {
    render(
      <div>
        <MetaTooltip label="Ervaring: 5+ jaar">
          <span data-testid="badge">Badge</span>
        </MetaTooltip>
        <button data-testid="outside">Buiten</button>
      </div>,
    );

    tap(screen.getByTestId("badge"));
    const tip = screen.getByRole("tooltip", { hidden: true });
    expect(tip).toHaveAttribute("aria-hidden", "false");

    // De globale pointerdown-listener wordt op `document` met capture geregistreerd
    // en sluit de tooltip wanneer de tap buiten de wrapper plaatsvindt.
    act(() => {
      const outside = screen.getByTestId("outside");
      const evt = createEvent.pointerDown(outside, { bubbles: true });
      fireEvent(outside, evt);
    });

    expect(tip).toHaveAttribute("aria-hidden", "true");
  });

  it("sluit de tooltip met Escape", () => {
    render(
      <MetaTooltip label="Regio: Midden-Nederland">
        <span data-testid="badge">Badge</span>
      </MetaTooltip>,
    );

    tap(screen.getByTestId("badge"));
    const tip = screen.getByRole("tooltip", { hidden: true });
    expect(tip).toHaveAttribute("aria-hidden", "false");

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(tip).toHaveAttribute("aria-hidden", "true");
  });

  it("toggelt sluiten bij een tweede tap op dezelfde badge", () => {
    render(
      <MetaTooltip label="Uren: 32-40">
        <span data-testid="badge">Badge</span>
      </MetaTooltip>,
    );

    const badge = screen.getByTestId("badge");
    const tip = screen.getByRole("tooltip", { hidden: true });

    tap(badge);
    expect(tip).toHaveAttribute("aria-hidden", "false");

    tap(badge);
    expect(tip).toHaveAttribute("aria-hidden", "true");
  });
});

/**
 * iOS Safari heeft een aantal eigenaardigheden t.o.v. desktop browsers:
 *  1. Na een touch-tap synthetiseert iOS Safari een `mouseenter` direct vóór een
 *     eventuele `click`. De tooltip mag daardoor niet dubbel toggelen of crashen.
 *  2. Op niet-interactieve elementen (zoals een <span> badge) krijgt het element
 *     géén focus na een tap — alleen pointer events vuren.
 *  3. Bij blur na een outside-tap is `relatedTarget` op iOS regelmatig `null`.
 *  4. Tijdens momentum-scroll vuurt iOS veel scroll-events; reposition mag niet crashen.
 */
describe("MetaTooltip — iOS Safari gedrag", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("blijft open wanneer iOS Safari na een tap een gesynthetiseerd mouseenter stuurt", () => {
    render(
      <MetaTooltip label="iOS — synthetic mouse na touch">
        <span data-testid="badge">Badge</span>
      </MetaTooltip>,
    );

    const badge = screen.getByTestId("badge");
    const tip = screen.getByRole("tooltip", { hidden: true });

    tap(badge);
    expect(tip).toHaveAttribute("aria-hidden", "false");

    // iOS Safari vuurt direct na touch een synthetisch mouseenter op de wrapper.
    act(() => {
      fireEvent.mouseEnter(badge.parentElement!);
    });

    expect(tip).toHaveAttribute("aria-hidden", "false");
  });

  it("opent op pointerdown zonder dat het element focus krijgt (iOS span-badge)", () => {
    // Op iOS Safari ontvangen non-interactieve elementen géén focus na een tap.
    render(
      <MetaTooltip label="Geen focus nodig">
        <span data-testid="badge">Badge</span>
      </MetaTooltip>,
    );

    const badge = screen.getByTestId("badge");
    const tip = screen.getByRole("tooltip", { hidden: true });

    tap(badge);

    // Element krijgt geen focus, maar tooltip is wel zichtbaar.
    expect(document.activeElement).not.toBe(badge);
    expect(tip).toHaveAttribute("aria-hidden", "false");
  });

  it("sluit bij blur met relatedTarget=null (iOS gedrag na outside-tap)", () => {
    render(
      <div>
        <MetaTooltip label="iOS — null relatedTarget">
          <button data-testid="badge">Badge</button>
        </MetaTooltip>
      </div>,
    );

    const badge = screen.getByTestId("badge");
    const tip = screen.getByRole("tooltip", { hidden: true });

    act(() => {
      fireEvent.focus(badge);
    });
    expect(tip).toHaveAttribute("aria-hidden", "false");

    act(() => {
      fireEvent.blur(badge, { relatedTarget: null });
    });
    expect(tip).toHaveAttribute("aria-hidden", "true");
  });

  it("sluit via globale pointerdown-listener bij touch buiten de wrapper", () => {
    render(
      <div>
        <MetaTooltip label="iOS — outside touch">
          <span data-testid="badge">Badge</span>
        </MetaTooltip>
        <button data-testid="outside">Buiten</button>
      </div>,
    );

    tap(screen.getByTestId("badge"));
    const tip = screen.getByRole("tooltip", { hidden: true });
    expect(tip).toHaveAttribute("aria-hidden", "false");

    act(() => {
      const outside = screen.getByTestId("outside");
      const evt = createEvent.pointerDown(outside, { bubbles: true });
      Object.defineProperty(evt, "pointerType", { value: "touch" });
      fireEvent(outside, evt);
    });

    expect(tip).toHaveAttribute("aria-hidden", "true");
  });

  it("blijft open wanneer focus binnen de wrapper verschuift (badge → knop)", () => {
    render(
      <MetaTooltip label="Focus blijft binnen wrapper">
        <>
          <button data-testid="badge">Badge</button>
          <button data-testid="inner">Lees meer</button>
        </>
      </MetaTooltip>,
    );

    const badge = screen.getByTestId("badge");
    const inner = screen.getByTestId("inner");
    const tip = screen.getByRole("tooltip", { hidden: true });

    act(() => {
      fireEvent.focus(badge);
    });
    expect(tip).toHaveAttribute("aria-hidden", "false");

    // Focus verschuift naar een knop binnen dezelfde wrapper.
    act(() => {
      fireEvent.blur(badge, { relatedTarget: inner });
    });

    expect(tip).toHaveAttribute("aria-hidden", "false");
  });

  it("crasht niet bij scroll-events tijdens open (iOS momentum scroll)", () => {
    render(
      <MetaTooltip label="iOS — momentum scroll reposition">
        <span data-testid="badge">Badge</span>
      </MetaTooltip>,
    );

    tap(screen.getByTestId("badge"));
    const tip = screen.getByRole("tooltip", { hidden: true });
    expect(tip).toHaveAttribute("aria-hidden", "false");

    expect(() => {
      act(() => {
        for (let i = 0; i < 10; i += 1) {
          window.dispatchEvent(new Event("scroll"));
        }
        window.dispatchEvent(new Event("resize"));
      });
    }).not.toThrow();

    expect(tip).toHaveAttribute("aria-hidden", "false");
  });

  it("ruimt de auto-hide timer op bij unmount (geen lekken na tap)", () => {
    const { unmount } = render(
      <MetaTooltip label="iOS — geen lekken">
        <span data-testid="badge">Badge</span>
      </MetaTooltip>,
    );

    tap(screen.getByTestId("badge"));
    expect(() => unmount()).not.toThrow();
  });
});
