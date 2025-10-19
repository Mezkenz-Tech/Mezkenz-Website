import { NextResponse } from "next/server";
import { z } from "zod";

const CheckoutSchema = z.object({
  product: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = CheckoutSchema.parse(body);
    console.log("Checkout request", payload); // eslint-disable-line no-console
    return NextResponse.json({ message: "Checkout initiated. A team member will follow up shortly." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid product selection" }, { status: 422 });
    }
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
