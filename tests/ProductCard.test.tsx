import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard";

beforeEach(() => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({ message: "Checkout initiated" })
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ProductCard", () => {
  it("shows product details and handles checkout", async () => {
    render(
      <ProductCard
        name="Atlas Support Plan"
        type="Subscription"
        description="Unlimited helpdesk + monitoring."
        includes={["Response SLA < 1hr", "Inventory"]}
        price="€49/user/mo"
        slug="atlas-support-plan"
      />
    );

    expect(screen.getByRole("heading", { name: "Atlas Support Plan" })).toBeInTheDocument();
    expect(screen.getByText("Unlimited helpdesk + monitoring.")).toBeInTheDocument();
    expect(screen.getByText("Response SLA < 1hr")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Buy Now" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout initiated")).toBeInTheDocument();
    });
  });
});
