import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReaderPager } from "./reader-pager";

describe("ReaderPager", () => {
  afterEach(cleanup);

  it("navigates with buttons and exposes page position", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    render(<ReaderPager pageIndex={1} pageCount={4} onPrevious={onPrevious} onNext={onNext} />);

    expect(screen.getByText("Sayfa 2 / 4")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Önceki sayfa" }));
    fireEvent.click(screen.getByRole("button", { name: "Sonraki sayfa" }));
    expect(onPrevious).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("guards boundaries, interactive focus, and active text selections", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    render(
      <div>
        <button type="button">Başka kontrol</button>
        <ReaderPager pageIndex={0} pageCount={3} onPrevious={onPrevious} onNext={onNext} />
      </div>,
    );

    expect(screen.getByRole("button", { name: "Önceki sayfa" })).toBeDisabled();
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onPrevious).not.toHaveBeenCalled();

    const otherControl = screen.getByRole("button", { name: "Başka kontrol" });
    otherControl.focus();
    fireEvent.keyDown(otherControl, { key: "ArrowRight" });
    expect(onNext).not.toHaveBeenCalled();

    document.body.focus();
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onNext).toHaveBeenCalledOnce();

    const selection = vi
      .spyOn(window, "getSelection")
      .mockReturnValue({ toString: () => "seçili metin" } as Selection);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onNext).toHaveBeenCalledOnce();
    selection.mockRestore();
  });
});
