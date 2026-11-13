import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";
import { BrandMark } from "@/components/brand-mark";

const pub = (name: string) => join(import.meta.dirname, "..", "..", "..", "public", name);
const SIZES: Record<string, number> = { "icon-32.png": 32, "apple-touch-icon.png": 180, "icon-192.png": 192, "icon-512.png": 512, "icon-maskable-512.png": 512 };

describe("BrandMark", () => {
  it("is the simple drawing in fixed brand colours, decorative, with the tile edge on its own stroke", () => {
    const { container } = render(<BrandMark />);
    const svg = container.querySelector("svg.brand-mark")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg.querySelector("rect:not(.brand-mark-edge)")).toHaveAttribute("fill", "#160146");
    expect(svg.querySelector("path")).toHaveAttribute("fill", "#81fbb0");
    expect(svg.querySelector(".brand-mark-edge")).not.toHaveAttribute("fill");
    expect(svg.innerHTML).not.toMatch(/cobalt|currentColor/);
  });

  it("draws the same glyph as public/icon.svg, so the tab icon and the tile cannot drift", () => {
    const icon = readFileSync(pub("icon.svg"), "utf8");
    const { container } = render(<BrandMark />);
    expect(container.querySelector("path")!.getAttribute("d")).toBe(/fill-rule="evenodd" d="([^"]+)"/.exec(icon)![1]);
    expect(icon).toContain('fill="#160146"');
    expect(icon).toContain('fill="#81fbb0"');
  });
});

describe("app icons", () => {
  it.each(Object.entries(SIZES))("%s is a PNG of exactly %i pixels square", (name, size) => {
    const png = readFileSync(pub(name));
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([size, size]);
  });

  it("lists only PNGs that exist in the manifest, one of them maskable, and ships no maskable SVG", () => {
    const icons = manifest().icons!;
    for (const { src, sizes } of icons) { expect(existsSync(pub(src.replace(/^\//, ""))), src).toBe(true); expect(src).toMatch(/\.png$/); expect(sizes).toBe(`${SIZES[src.slice(1)]}x${SIZES[src.slice(1)]}`); }
    expect(icons.filter((icon) => icon.purpose === "maskable").map((icon) => icon.src)).toEqual(["/icon-maskable-512.png"]);
    expect(existsSync(pub("icon-maskable.svg"))).toBe(false);
  });
});
