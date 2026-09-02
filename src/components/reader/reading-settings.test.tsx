import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PREFERENCES_STORAGE_KEY } from "@/lib/reader/version";
import { ReaderPreferencesProvider } from "@/lib/preferences/use-reader-preferences";
import { ReadingSettings } from "./reading-settings";

describe("ReadingSettings", () => {
  afterEach(cleanup);

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
      within(controls.getByRole("group", { name: "Okuma düzeni" })).getByRole("button", {
        name: "Sayfalı",
      }),
    );
    fireEvent.click(
      within(controls.getByRole("group", { name: "Okuma alanı" })).getByRole("button", {
        name: "Tam",
      }),
    );
    fireEvent.click(controls.getByRole("button", { name: "Metni büyüt" }));
    fireEvent.click(
      within(controls.getByRole("group", { name: "Satır aralığı" })).getByRole("button", {
        name: "Ferah",
      }),
    );

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
    fireEvent.click(
      within(controls.getByRole("group", { name: "Yazı tipi" })).getByRole("button", {
        name: "Sade",
      }),
    );
    fireEvent.click(
      within(controls.getByRole("group", { name: "Harf aralığı" })).getByRole("button", {
        name: "Ferah",
      }),
    );
    fireEvent.click(
      within(controls.getByRole("group", { name: "Tema" })).getByRole("button", {
        name: "Sepya",
      }),
    );
    fireEvent.click(controls.getByRole("switch"));

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
      expect(document.documentElement.style.getPropertyValue("--reader-flow-width")).toBe("100%");
      expect(document.documentElement.style.getPropertyValue("--reader-letter-spacing")).toBe(
        "0.025em",
      );
      expect(document.documentElement).toHaveClass("sepia");
    });

    const stored = JSON.parse(window.localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? "{}");
    expect(stored).toMatchObject({
      textAlign: "justify",
      paragraphSpacing: "relaxed",
      firstLineIndent: "classic",
      hyphenation: "auto",
      readingMode: "paged",
      measure: "full",
      fontScale: "large",
      lineSpacing: "relaxed",
      fontFamily: "sans",
      letterSpacing: "relaxed",
      theme: "sepia",
      focusMode: true,
    });
  });

  it("closes from the panel and hands focus back to the trigger", async () => {
    render(
      <ReaderPreferencesProvider>
        <ReadingSettings />
      </ReaderPreferencesProvider>,
    );

    const trigger = screen.getByRole("button", { name: "Okuma ayarları" });
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Okuma ayarları" });
    // Keyboard users must land inside the panel rather than tabbing the whole page.
    await waitFor(() => expect(document.activeElement).toBe(dialog));

    fireEvent.click(within(dialog).getByRole("button", { name: "Ayarları kapat" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Okuma ayarları" })).toBeNull(),
    );
    expect(document.activeElement).toBe(trigger);
  });

  it("says when the paged layout cannot apply at this width", async () => {
    render(
      <ReaderPreferencesProvider>
        <ReadingSettings isPagedAvailable={false} />
      </ReaderPreferencesProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Okuma ayarları" }));
    const dialog = screen.getByRole("dialog", { name: "Okuma ayarları" });
    expect(within(dialog).getByText("Geniş ekranlarda iki sütun")).toBeInTheDocument();

    fireEvent.click(
      within(within(dialog).getByRole("group", { name: "Okuma düzeni" })).getByRole("button", {
        name: "Sayfalı",
      }),
    );
    await waitFor(() =>
      expect(
        within(dialog).getByText("Bu ekran genişliğinde tek sütun kullanılıyor."),
      ).toBeInTheDocument(),
    );
  });

  it("explains the reset before it happens and disarms when the panel is reopened", async () => {
    render(
      <ReaderPreferencesProvider>
        <ReadingSettings />
      </ReaderPreferencesProvider>,
    );

    const trigger = screen.getByRole("button", { name: "Okuma ayarları" });
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Okuma ayarları" });
    expect(
      within(dialog).getByText("Bütün okuma tercihleri varsayılana döner."),
    ).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Tercihleri sıfırla" }));
    await waitFor(() =>
      expect(
        within(dialog).getByText("Emin misin? Onaylamak için tekrar dokun."),
      ).toBeInTheDocument(),
    );

    // Closing and reopening must not leave a primed destructive action behind.
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.click(trigger);
    const reopened = screen.getByRole("dialog", { name: "Okuma ayarları" });
    expect(
      within(reopened).getByText("Bütün okuma tercihleri varsayılana döner."),
    ).toBeInTheDocument();
  });

  it("supports the full text-size range and resets every preference", async () => {
    render(
      <ReaderPreferencesProvider>
        <ReadingSettings />
      </ReaderPreferencesProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Okuma ayarları" }));
    const dialog = screen.getByRole("dialog", { name: "Okuma ayarları" });
    const decrease = within(dialog).getByRole("button", { name: "Metni küçült" });
    const increase = within(dialog).getByRole("button", { name: "Metni büyüt" });

    fireEvent.click(decrease);
    fireEvent.click(decrease);
    await waitFor(() => expect(within(dialog).getByText("80%")).toBeInTheDocument());
    expect(decrease).toBeDisabled();

    for (let step = 0; step < 5; step += 1) fireEvent.click(increase);
    await waitFor(() => expect(within(dialog).getByText("135%")).toBeInTheDocument());
    expect(increase).toBeDisabled();

    fireEvent.click(within(dialog).getByRole("button", { name: "Tercihleri sıfırla" }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Sıfırla" }));

    await waitFor(() => expect(within(dialog).getByText("100%")).toBeInTheDocument());
    const stored = JSON.parse(window.localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? "{}");
    expect(stored).toMatchObject({
      fontScale: "standard",
      readingMode: "flow",
      measure: "standard",
      letterSpacing: "normal",
      theme: "system",
      focusMode: false,
    });
  });
});
