import { render, screen } from "@testing-library/react";
import { Hero } from "@/sections/Hero";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />
}));

describe("Hero", () => {
  it("renders highlights and calls to action", () => {
    render(
      <Hero
        highlights={["Same-day onboarding", "24/7 monitoring"]}
        socialProof="Trusted by 150+ devices across 30 clients"
      />
    );

    expect(screen.getByRole("heading", { name: /reliable it, ready when you are\./i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book a free consult/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByText("Managed support, cloud migrations, and cybersecurity—built for small and mid-sized teams.")).toBeInTheDocument();
    expect(screen.getByText("Same-day onboarding")).toBeInTheDocument();
    expect(screen.getByText("Trusted by 150+ devices across 30 clients")).toBeInTheDocument();
  });
});
