import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  teamSize: z.string().min(1),
  message: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = ContactSchema.parse(body);
    console.log("Contact request", payload); // eslint-disable-line no-console
    return NextResponse.json({ message: "Thanks! We’ll get back within one business day." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", issues: error.flatten().fieldErrors },
        { status: 422 }
      );
    }
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
