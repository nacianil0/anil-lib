import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { PREFERENCES_STORAGE_KEY } from "@/lib/reader/version";
import { ReaderPreferencesProvider } from "@/lib/preferences/use-reader-preferences";
import { ReadingSettings } from "./reading-settings";

describe("ReadingSettings", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({
        matches: false,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }),
    });
  });

  it("applies and persists the expanded typography controls", async () => {
    render(
      <ReaderPreferencesProvider>
        <ReadingSettings />
      </ReaderPreferencesProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Okuma ayarları" }));
    const dialog = screen.getByRole("dialog", { name: "Okuma ayarları" });
    const controls = within(dialog);

    fireEvent.click(
      within(controls.getByRole("group", { name: "Metin hizası" })).getByRole("button", {
        name: "İki yana",
      }),
    );
    fireEvent.click(
      within(controls.getByRole("group", { name: "Paragraf aralığı" })).getByRole("button", {
        name: "Ferah",
      }),
    );
    fireEvent.click(
      within(controls.getByRole("group", { name: "İlk satır girintisi" })).getByRole("button", {
        name: "Klasik",
      }),
    );
    fireEvent.click(
      within(controls.getByRole("group", { name: "Heceleme" })).getByRole("button", {
        name: "Otomatik",
      }),
    );

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue("--reader-text-align")).toBe(
        "justify",
      );
      expect(document.documentElement.style.getPropertyValue("--reader-paragraph-spacing")).toBe(
        "1.75rem",
      );
      expect(document.documentElement.style.getPropertyValue("--reader-first-line-indent")).toBe(
        "1.75em",
      );
      expect(document.documentElement.style.getPropertyValue("--reader-hyphens")).toBe("auto");
    });

    const stored = JSON.parse(window.localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? "{}");
    expect(stored).toMatchObject({
      textAlign: "justify",
      paragraphSpacing: "relaxed",
      firstLineIndent: "classic",
      hyphenation: "auto",
    });
  });
});
