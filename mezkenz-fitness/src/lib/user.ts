import { prisma } from "@/lib/prisma";

export async function getDefaultUserId(): Promise<string> {
  const email = "demo@mezkenz.fit";
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Demo User" },
  });
  return user.id;
}
