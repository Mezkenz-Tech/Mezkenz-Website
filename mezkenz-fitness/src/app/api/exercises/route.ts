import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const exercises = await prisma.exercise.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ exercises });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.name) {
    return NextResponse.json({ error: "Missing exercise name" }, { status: 400 });
  }
  const exercise = await prisma.exercise.upsert({
    where: { name: body.name },
    update: {
      category: body.category ?? null,
      bodyPart: body.bodyPart ?? null,
      equipment: body.equipment ?? null,
      defaultRestSeconds: body.defaultRestSeconds ?? null,
      defaultTempo: body.defaultTempo ?? null,
    },
    create: {
      name: body.name,
      category: body.category ?? null,
      bodyPart: body.bodyPart ?? null,
      equipment: body.equipment ?? null,
      defaultRestSeconds: body.defaultRestSeconds ?? null,
      defaultTempo: body.defaultTempo ?? null,
    },
  });
  return NextResponse.json({ exercise });
}
