import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act, fireEvent, createEvent } from "@testing-library/react";
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
