import { expect, test, type Locator, type Page } from "@playwright/test";

/*
 * Scrollbars: the Portal Dashboard bar on every scrolling surface a mouse reaches.
 *
 * Headless Chromium starts with `--hide-scrollbars` by default, which stops it from
 * drawing — or reserving room for — any scrollbar at all: every width measured here
 * would be 0 whatever the stylesheet says, and the suite would pass against an
 * unstyled 15px Windows bar with its arrow buttons. Dropping the flag makes the
 * browser lay bars out as a desktop does, so a bar is a number: `offsetWidth -
 * clientWidth` on a box, `innerWidth - clientWidth` on the page.
 *
 * Every expected size comes from the stylesheet's own tokens (`--scrollbar-size`
 * and friends), so the spec follows the design rather than restating it; the one
 * test that pins the tokens to the Portal standard says so.
 */
test.use({ launchOptions: { ignoreDefaultArgs: ["--hide-scrollbars"] } });

const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";
const READER_PREFERENCES = {
  version: 1,
  theme: "system",
  fontScale: "standard",
  lineSpacing: "balanced",
  measure: "standard",
  fontFamily: "editorial",
  focusMode: false,
  paragraphSpacing: "balanced",
  firstLineIndent: "none",
  hyphenation: "auto",
  readingMode: "flow",
  letterSpacing: "normal",
  fontWeight: "regular",
  lineGuide: false,
};

/** A long chapter with code blocks and diagrams: the page scrolls well past one screen. */
const LONG_CHAPTER = "/seri/ajan-bellegi-ve-durum-yonetimi";
/** The chapter with the most headings and the widest table: its contents menu overflows. */
const MANY_HEADINGS = "/seri/arac-kullanimi-islev-cagrisi";

const THEMES = ["light", "sepia", "dark"] as const;
type Theme = (typeof THEMES)[number];

/**
 * Seeds reading preferences before the first paint. Writing them after load races
 * the provider's throttled save, which would put the defaults back.
 */
async function seedPreferences(page: Page, overrides: Record<string, unknown>) {
  await page.addInitScript(
    ([key, value]) => {
      try {
        window.localStorage.setItem(key as string, value as string);
      } catch {
        /* ignore */
      }
    },
    [PREFERENCES_KEY, JSON.stringify({ ...READER_PREFERENCES, ...overrides })],
  );
}

/**
 * Opens a chapter and waits for the reader to settle: the text is there and the
 * preferences provider has applied the column width. Until then the column is
 * narrower, and anything measured against it moves on its own.
 */
async function openChapter(page: Page, chapter: string) {
  await page.goto(chapter);
  await expect(page.locator(".prose-reader p").first()).toBeVisible({ timeout: 60_000 });
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.style.getPropertyValue("--reader-flow-width")),
    )
    .not.toBe("");
}

/** A length token from the root, in pixels (`--scrollbar-size: 10px` → 10). */
function lengthToken(page: Page, name: string) {
  return page.evaluate(
    (property) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(property)),
    name,
  );
}

/** The page's own bar: the width the viewport gives up to it. */
function pageBar(page: Page) {
  return page.evaluate(() => window.innerWidth - document.documentElement.clientWidth);
}

/** How far the page reaches past the viewport sideways; 0 or less means it does not. */
function pageOverflowX(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

/** A box's own vertical bar, borders taken out. */
function verticalBar(box: Locator) {
  return box.evaluate((element) => {
    const style = getComputedStyle(element);
    return (
      (element as HTMLElement).offsetWidth -
      element.clientWidth -
      parseFloat(style.borderLeftWidth) -
      parseFloat(style.borderRightWidth)
    );
  });
}

/** True once two readings in a row agree: the thing measured has stopped moving. */
function settled(read: () => Promise<number>) {
  let last: number | undefined;
  return async () => {
    const value = await read();
    const same = value === last;
    last = value;
    return same;
  };
}

test.describe("scrollbars on a pointer screen", () => {
  for (const theme of THEMES) {
    test(`draws the page's bar at the token's width with nothing sideways — ${theme}`, async ({
      page,
    }) => {
      await seedPreferences(page, { theme });
      await openChapter(page, LONG_CHAPTER);
      await expectTheme(page, theme);

      const size = await lengthToken(page, "--scrollbar-size");
      expect(size).toBeGreaterThan(0);
      expect(
        await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight),
      ).toBeGreaterThan(1000);
      // The browser's own bar is 15px on Windows; the styled one is the token's width.
      await expect.poll(() => pageBar(page)).toBe(size);
      expect(await pageOverflowX(page)).toBeLessThanOrEqual(0);

      // From Chromium 121 a `scrollbar-color` or `scrollbar-width` anywhere up the tree
      // switches the ::-webkit-scrollbar rules off and brings back the arrow buttons.
      // The width above would catch it too; this says why.
      const standard = await page.evaluate(() =>
        [document.documentElement, document.body, document.querySelector(".prose-reader")!].map(
          (element) => {
            const style = getComputedStyle(element);
            return `${style.scrollbarColor} / ${style.scrollbarWidth}`;
          },
        ),
      );
      expect(standard).toEqual(["auto / auto", "auto / auto", "auto / auto"]);
    });
  }

  // Portal's standing rule for navigation rails: the list scrolls natively with no
  // visible bar, and every way of moving through it still works.
  test("scrolls the desktop reading list natively, with its bar hidden", async ({ page }) => {
    await seedPreferences(page, { theme: "light" });
    await openChapter(page, LONG_CHAPTER);
    const size = await lengthToken(page, "--scrollbar-size");

    const list = page.locator('aside[aria-label="Okuma listesi"] div.overflow-y-auto');
    await expect(list).toBeVisible();
    const fits = await list.evaluate((element) => element.scrollHeight <= element.clientHeight);
    expect(fits, "the reading list should be longer than the window").toBe(false);
    expect(await verticalBar(list)).toBe(0);

    await list.evaluate((element) => {
      element.scrollTop = 0;
    });
    const pageBefore = await page.evaluate(() => window.scrollY);

    const box = (await list.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, 240);

    await expect.poll(() => list.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
    // The wheel was the list's; the page stays where the reader left it.
    expect(await page.evaluate(() => window.scrollY)).toBe(pageBefore);
    expect(await pageBar(page)).toBe(size);

    // At the end of the list the wheel stops there instead of scrolling the article.
    await list.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await page.mouse.wheel(0, 480);
    await expect.poll(() => list.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(pageBefore);

    // Keyboard focus brings a chapter that is out of view into the list's view.
    await list.evaluate((element) => {
      element.scrollTop = 0;
    });
    const lastLink = list.getByRole("link").last();
    await lastLink.focus();
    await expect
      .poll(() =>
        lastLink.evaluate((link) => {
          const row = link.getBoundingClientRect();
          const view = link.closest(".overflow-y-auto")!.getBoundingClientRect();
          return row.top >= view.top - 1 && row.bottom <= view.bottom + 1;
        }),
      )
      .toBe(true);
  });

  test("keeps an overflowing panel on screen, with the same bar", async ({ page }) => {
    // A short window: both toolbar panels run out of height and scroll inside.
    await page.setViewportSize({ width: 1280, height: 480 });
    await seedPreferences(page, { theme: "light" });
    await openChapter(page, MANY_HEADINGS);
    const size = await lengthToken(page, "--scrollbar-size");

    const panels = [
      { trigger: "İçindekiler", dialog: "İçindekiler" },
      { trigger: "Okuma ayarları", dialog: "Okuma ayarları" },
    ];
    for (const { trigger, dialog } of panels) {
      const button = page.getByRole("button", { name: trigger, exact: true });
      // The contents menu appears once the fonts have settled and its headings are measured.
      await expect(button).toBeVisible();
      await button.click();
      const panel = page.getByRole("dialog", { name: dialog });
      await expect(panel).toBeVisible();

      const fits = await panel.evaluate((element) => element.scrollHeight <= element.clientHeight);
      expect(fits, `${dialog} should overflow a 480px window`).toBe(false);
      expect(await verticalBar(panel), dialog).toBe(size);

      const frame = await panel.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          // The page's own bar is not room a panel may take.
          width: document.documentElement.clientWidth,
          height: window.innerHeight,
        };
      });
      expect(frame.left, dialog).toBeGreaterThanOrEqual(0);
      expect(frame.top, dialog).toBeGreaterThanOrEqual(0);
      expect(frame.right, dialog).toBeLessThanOrEqual(frame.width);
      expect(frame.bottom, dialog).toBeLessThanOrEqual(frame.height);
      expect(await pageOverflowX(page), dialog).toBeLessThanOrEqual(0);

      await page.keyboard.press("Escape");
      await expect(panel).toHaveCount(0);
    }
  });

  test("keeps the paged reader's columns free of a bar, and the page still", async ({ page }) => {
    await seedPreferences(page, { theme: "light", readingMode: "paged" });
    await openChapter(page, LONG_CHAPTER);
    await expect(page.locator(".reader-shell")).toHaveAttribute("data-reading-mode", "paged");
    const pager = page.getByRole("navigation", { name: "Sayfa gezintisi" });
    await expect(pager).toBeVisible();

    const prose = page.locator(".prose-reader");
    const measure = () =>
      prose.evaluate((element) => ({
        horizontalBar: (element as HTMLElement).offsetHeight - element.clientHeight,
        verticalBar: (element as HTMLElement).offsetWidth - element.clientWidth,
        overflowX: element.scrollWidth - element.clientWidth,
        pageBar: window.innerWidth - document.documentElement.clientWidth,
        pageOverflowY: document.documentElement.scrollHeight - window.innerHeight,
        pageScroll: [window.scrollX, window.scrollY],
      }));

    const before = await measure();
    // The columns do run sideways — the bar is hidden, not absent for want of overflow.
    expect(before.overflowX).toBeGreaterThan(0);
    expect(before.horizontalBar).toBe(0);
    expect(before.verticalBar).toBe(0);
    // One viewport: no page bar, nothing for the page to scroll.
    expect(before.pageBar).toBe(0);
    expect(before.pageOverflowY).toBeLessThanOrEqual(1);
    expect(before.pageScroll).toEqual([0, 0]);

    await pager.getByRole("button", { name: "Sonraki sayfa" }).click();
    await expect(pager).toContainText("Sayfa 2 /");
    await expect.poll(() => prose.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    const after = await measure();
    expect(after.horizontalBar).toBe(0);
    expect(after.pageBar).toBe(0);
    expect(after.pageScroll).toEqual([0, 0]);
  });

  test("holds the page still behind the figure viewer", async ({ page }) => {
    await seedPreferences(page, { theme: "light" });
    await openChapter(page, LONG_CHAPTER);
    const size = await lengthToken(page, "--scrollbar-size");

    const figure = page.locator("figure.series-figure").first();
    const enlarge = figure.getByRole("button", { name: "Şekli büyüt" });
    await enlarge.scrollIntoViewIfNeeded();

    const title = page.locator("main .chapter-header h1");
    const settingsButton = page.locator('header button[aria-label="Okuma ayarları"]');
    const left = () => title.evaluate((element) => element.getBoundingClientRect().left);
    await expect.poll(settled(left)).toBe(true);

    const snapshot = () =>
      page.evaluate(() => ({
        bar: window.innerWidth - document.documentElement.clientWidth,
        overflow: document.body.style.overflow,
        inlinePadding: document.body.style.paddingRight,
        padding: parseFloat(getComputedStyle(document.body).paddingRight),
        scrollY: window.scrollY,
      }));
    const before = await snapshot();
    const titleLeft = await left();
    const toolbarRight = await settingsButton.evaluate(
      (element) => element.getBoundingClientRect().right,
    );
    expect(before.bar).toBe(size);

    await enlarge.click();
    const viewer = page.getByRole("dialog", {
      name: (await figure.locator("figcaption").innerText()).trim(),
    });
    await expect(viewer).toBeVisible();

    // The page's bar goes with the scroll lock; its width comes back as padding,
    // so nothing behind the viewer moves sideways.
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    const open = await snapshot();
    expect(open.bar).toBe(0);
    expect(open.padding).toBe(before.padding + before.bar);
    expect(await left()).toBeCloseTo(titleLeft, 2);
    expect(
      await settingsButton.evaluate((element) => element.getBoundingClientRect().right),
    ).toBeCloseTo(toolbarRight, 2);
    expect(open.scrollY).toBe(before.scrollY);

    await page.keyboard.press("Escape");
    await expect(viewer).toHaveCount(0);
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe(before.overflow);
    const closed = await snapshot();
    expect(closed.inlinePadding).toBe(before.inlinePadding);
    expect(closed.padding).toBe(before.padding);
    expect(closed.bar).toBe(size);
    expect(closed.scrollY).toBe(before.scrollY);
    expect(await left()).toBeCloseTo(titleLeft, 2);
  });

  test("pins the tokens to the Portal standard", async ({ page }) => {
    await seedPreferences(page, { theme: "light" });
    await openChapter(page, LONG_CHAPTER);
    // A 10px track whose square thumb is inset 2px (6px seen), never shorter than 32px.
    expect(await lengthToken(page, "--scrollbar-size")).toBe(10);
    expect(await lengthToken(page, "--scrollbar-inset")).toBe(2);
    expect(await lengthToken(page, "--scrollbar-thumb-min")).toBe(32);
  });

  for (const theme of THEMES) {
    test(`resolves the bar's colours from the ${theme} theme, thumb at 3:1 on its track`, async ({
      page,
    }) => {
      await seedPreferences(page, { theme });
      await openChapter(page, LONG_CHAPTER);
      await expectTheme(page, theme);

      const tokens = await page.evaluate(() => {
        const style = getComputedStyle(document.documentElement);
        const read = (name: string) => style.getPropertyValue(name).trim();
        return { thumb: read("--scrollbar-thumb"), accent: read("--accent") };
      });
      expect(tokens.accent).not.toBe("");
      expect(tokens.thumb).toBe(tokens.accent);

      const colours = await resolveColours(page, [
        "--scrollbar-track",
        "--scrollbar-thumb",
        "--scrollbar-thumb-hover",
        "--scrollbar-thumb-active",
      ]);
      const [track, ...thumbs] = colours;
      // Each state of the thumb stays a non-text graphic the eye can find (WCAG 1.4.11).
      for (const [index, name] of ["thumb", "hover", "active"].entries()) {
        expect(contrast(thumbs[index], track), `${theme} ${name}`).toBeGreaterThanOrEqual(3);
      }
      // The track is a tint, not a colour of its own: close to the muted surface.
      expect(contrast(track, (await resolveColours(page, ["--surface-muted"]))[0])).toBeLessThan(
        1.3,
      );
    });
  }
});

test.describe("scrollbars on a touch screen", () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

  test("leaves the platform's overlay bars alone", async ({ page }) => {
    await seedPreferences(page, { theme: "light" });
    await openChapter(page, LONG_CHAPTER);

    // The pre-paint probe finds an overlay bar with no width and leaves it unmarked.
    await expect(page.locator("html")).not.toHaveClass(/\bclassic-scrollbars\b/);
    // Overlay bars take no room; a styled bar would take the token's width.
    expect(await pageBar(page)).toBe(0);
    expect(await pageOverflowX(page)).toBeLessThanOrEqual(0);

    // The drawer locks the page, and with no bar to make up for adds no padding.
    await page.getByRole("button", { name: "Okuma listesini aç" }).click();
    const drawer = page.getByRole("dialog", { name: "Okuma listesi" });
    await expect(drawer).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    expect(await page.evaluate(() => document.body.style.paddingRight)).toBe("");
    const list = drawer.locator(".overflow-y-auto").first();
    expect(await list.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(
      true,
    );
    expect(await verticalBar(list)).toBe(0);
    expect(await pageOverflowX(page)).toBeLessThanOrEqual(0);

    await page.keyboard.press("Escape");
    await expect(drawer).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
  });
});

test.describe("scrollbars on a touch-first Windows screen", () => {
  // A desktop whose primary pointer is touch (a tablet without its keyboard, a touch
  // monitor): pointer media says "coarse", yet Windows still draws a bar that takes
  // room, with arrow buttons. The gate follows the bar, not the pointer.
  test.use({ viewport: { width: 1280, height: 900 }, hasTouch: true });

  test("still draws the Portal bar where the platform bar takes room", async ({ page }) => {
    await seedPreferences(page, { theme: "light" });
    await openChapter(page, LONG_CHAPTER);

    const size = await lengthToken(page, "--scrollbar-size");
    await expect(page.locator("html")).toHaveClass(/\bclassic-scrollbars\b/);
    await expect.poll(() => pageBar(page)).toBe(size);
    // The reading list keeps Portal's hidden rail bar here too.
    const list = page.locator('aside[aria-label="Okuma listesi"] .overflow-y-auto');
    expect(await verticalBar(list)).toBe(0);
    expect(await pageOverflowX(page)).toBeLessThanOrEqual(0);
  });
});

test.describe("the phone reading list on a narrow desktop window", () => {
  test.use({ viewport: { width: 900, height: 700 } });

  test("lets the page go when the window grows past the drawer's breakpoint", async ({ page }) => {
    await seedPreferences(page, { theme: "light" });
    await openChapter(page, LONG_CHAPTER);
    const size = await lengthToken(page, "--scrollbar-size");

    await page.getByRole("button", { name: "Okuma listesini aç" }).click();
    const drawer = page.getByRole("dialog", { name: "Okuma listesi" });
    await expect(drawer).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    // The bar the lock takes away comes back as padding, so nothing moves sideways.
    expect(await page.evaluate(() => document.body.style.paddingRight)).toBe(`${size}px`);

    // From lg up the drawer and its button are hidden; the lock must not outlive them.
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(drawer).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
    expect(await page.evaluate(() => document.body.style.paddingRight)).toBe("");
    await expect.poll(() => pageBar(page)).toBe(size);

    const before = await page.evaluate(() => window.scrollY);
    await page.mouse.move(700, 500);
    await page.mouse.wheel(0, 600);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
  });
});

async function expectTheme(page: Page, theme: Theme) {
  const html = page.locator("html");
  if (theme === "light") {
    await expect(html).not.toHaveClass(/\b(dark|sepia)\b/);
  } else {
    await expect(html).toHaveClass(new RegExp(`\\b${theme}\\b`));
  }
}

type Rgb = [number, number, number];

/**
 * Resolves colour tokens the way the bar paints them: through an element (which
 * substitutes the `var()`s and `color-mix()`es for the current theme), then
 * through a canvas pixel, so whatever notation the browser serialises to ends up
 * as plain 8-bit sRGB.
 */
function resolveColours(page: Page, names: string[]): Promise<Rgb[]> {
  return page.evaluate((properties) => {
    const probe = document.createElement("div");
    probe.style.cssText = "position:fixed;width:0;height:0;visibility:hidden";
    document.body.append(probe);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true })!;
    try {
      return properties.map((property) => {
        probe.style.color = `var(${property})`;
        const computed = getComputedStyle(probe).color;
        context.clearRect(0, 0, 1, 1);
        // An unparsed colour leaves the transparent fill in place and fails below.
        context.fillStyle = "rgba(0, 0, 0, 0)";
        context.fillStyle = computed;
        context.fillRect(0, 0, 1, 1);
        const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
        if (alpha !== 255)
          throw new Error(`${property} did not resolve to an opaque colour: ${computed}`);
        return [red, green, blue] as [number, number, number];
      });
    } finally {
      probe.remove();
    }
  }, names);
}

/** WCAG 2 contrast ratio between two sRGB colours. */
function contrast(a: Rgb, b: Rgb) {
  const luminance = ([red, green, blue]: Rgb) => {
    const channel = (value: number) => {
      const unit = value / 255;
      return unit <= 0.04045 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
  };
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}
