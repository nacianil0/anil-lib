import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ResetReadingState } from "./reset-reading-state";

const hoisted = vi.hoisted(() => ({
  refresh: vi.fn(),
  action: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: hoisted.refresh }),
}));

vi.mock("./actions", () => ({
  resetReadingAction: hoisted.action,
}));

const { ResetReadingForm } = await import("./reset-reading-form");

const USER_ID = "00000000-0000-4000-8000-00000000000a";

function renderForm(counts: { savedPlaceCount?: number; highlightCount?: number } = {}) {
  return render(
    <ResetReadingForm
      highlightCount={counts.highlightCount ?? 2}
      savedPlaceCount={counts.savedPlaceCount ?? 3}
      userId={USER_ID}
      username="anil"
    />,
  );
}

describe("ResetReadingForm", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // The confirm ignores presses in the first moments after arming; tests move the
  // clock on explicitly when they mean a deliberate confirm.
  let now = 1_000_000;
  function later() {
    now += 1_000;
  }

  beforeEach(() => {
    now = 1_000_000;
    vi.spyOn(Date, "now").mockImplementation(() => now);
    hoisted.refresh.mockClear();
    hoisted.action.mockReset();
    hoisted.action.mockImplementation(
      async (): Promise<ResetReadingState> => ({
        status: "success",
        progress: 7,
        savedPlaces: 3,
        highlights: 0,
      }),
    );
  });

  it("needs two presses: the first only arms, and can be taken back", () => {
    renderForm();

    const start = screen.getByRole("button", { name: "Okuma geçmişini sıfırla" });
    expect(start).toHaveAttribute("type", "button");
    expect(screen.queryByRole("button", { name: "Evet, sıfırla" })).toBeNull();

    fireEvent.click(start);
    expect(screen.getByText("Emin misin? Bu işlem geri alınamaz.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Evet, sıfırla" })).toHaveAttribute("type", "submit");

    fireEvent.click(screen.getByRole("button", { name: "Vazgeç" }));
    expect(screen.queryByRole("button", { name: "Evet, sıfırla" })).toBeNull();
    expect(hoisted.action).not.toHaveBeenCalled();
  });

  it("sends the chosen extras with the account id, reports the counts and refreshes", async () => {
    renderForm();

    fireEvent.click(screen.getByRole("checkbox", { name: /Yer imlerini de sil/ }));
    fireEvent.click(screen.getByRole("button", { name: "Okuma geçmişini sıfırla" }));
    later();
    fireEvent.click(screen.getByRole("button", { name: "Evet, sıfırla" }));

    await waitFor(() => expect(hoisted.refresh).toHaveBeenCalled());
    const [, formData] = hoisted.action.mock.calls[0] as [unknown, FormData];
    expect(formData.get("userId")).toBe(USER_ID);
    expect(formData.get("savedPlaces")).toBe("on");
    expect(formData.get("highlights")).toBeNull();
    expect(
      screen.getByText(/Sıfırlandı: 7 bölümün ilerlemesi silindi, 3 yer imi kaldırıldı/),
    ).toBeInTheDocument();
    // Disarmed again: another reset needs two presses.
    expect(screen.getByRole("button", { name: "Okuma geçmişini sıfırla" })).toBeInTheDocument();
  });

  it("puts focus on backing out, and ignores a confirm that follows the arming press", () => {
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: "Okuma geçmişini sıfırla" }));
    expect(screen.getByRole("button", { name: "Vazgeç" })).toHaveFocus();

    // The second click of a double-click, a double-tap or a repeated key press.
    now += 200;
    fireEvent.click(screen.getByRole("button", { name: "Evet, sıfırla" }));
    expect(hoisted.action).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Evet, sıfırla" })).toBeInTheDocument();
  });

  it("offers no extra that has nothing to remove", () => {
    renderForm({ savedPlaceCount: 0, highlightCount: 0 });
    expect(screen.getByRole("checkbox", { name: /Yer imlerini de sil/ })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: /İşaretleri de sil/ })).toBeDisabled();
  });

  it("shows the server's refusal", async () => {
    hoisted.action.mockImplementation(
      async (): Promise<ResetReadingState> => ({
        status: "error",
        message: "Bu işlem için yetkin yok.",
      }),
    );
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: "Okuma geçmişini sıfırla" }));
    later();
    fireEvent.click(screen.getByRole("button", { name: "Evet, sıfırla" }));

    expect(await screen.findByText("Bu işlem için yetkin yok.")).toBeInTheDocument();
    expect(hoisted.refresh).not.toHaveBeenCalled();
  });
});
