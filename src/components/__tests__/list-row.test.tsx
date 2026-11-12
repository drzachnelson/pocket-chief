import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ListRow } from "@/components/list-row";

const rows = (...children: React.ReactNode[]) => render(<ul className="list-rows">{children}</ul>);

describe("ListRow", () => {
  it("is one link carrying the title, with a chevron nobody hears", () => {
    const { container } = rows(<ListRow href="/topics/x" title="Hernia" />);

    const link = screen.getByRole("link", { name: "Hernia" });
    expect(link).toHaveAttribute("href", "/topics/x");
    expect(link).toHaveClass("list-row");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("small")).toBeNull();
  });

  it("adds a quiet line and trailing text to the link's name, and a silent count to neither", () => {
    rows(
      <ListRow key="a" href="/a" title="Cholecystectomy" quiet="Hepatobiliary" trailing="Playbook" />,
      <ListRow key="b" href="/b" title="Biliary" trailing={<span aria-hidden="true">8</span>} />,
    );

    // jsdom runs no CSS, so it joins the parts without the spaces a browser puts between blocks; the parts are what matters here.
    expect(screen.getAllByRole("link")[0]).toHaveTextContent(/^CholecystectomyHepatobiliaryPlaybook$/);
    expect(screen.getByRole("link", { name: "Biliary" })).toBeInTheDocument();
    expect(screen.getByText("Hepatobiliary").tagName).toBe("SMALL");
  });

  it("puts an action where the chevron was, outside the link, so the title area alone is the link", () => {
    const { container } = rows(<ListRow href="/a" title="Cholecystectomy" quiet="Hepatobiliary" action={<button type="button">Save Cholecystectomy</button>} />);

    const link = screen.getByRole("link", { name: /Cholecystectomy/ });
    expect(link).not.toContainElement(screen.getByRole("button", { name: "Save Cholecystectomy" }));
    expect(link).not.toHaveTextContent("Save");
    expect(container.querySelector("svg")).toBeNull();
    expect(container.querySelector("li")).toHaveClass("list-row-split");
  });

  it("is a static row, not a link, when it has no href", () => {
    const { container } = rows(<ListRow title="No longer available" action={<button type="button">Save</button>} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(container.querySelector(".list-row")).toHaveClass("list-row-static");
    expect(container.querySelector(".list-row")).toHaveTextContent("No longer available");
  });
});
