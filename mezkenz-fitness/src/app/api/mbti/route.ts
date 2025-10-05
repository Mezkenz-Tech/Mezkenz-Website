import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDefaultUserId } from "@/lib/user";

export async function GET() {
  const userId = await getDefaultUserId();
  const results = await prisma.mBTIResult.findMany({
    where: { userId },
    orderBy: { assessedAt: "desc" },
    take: 5,
  });
  return NextResponse.json({ results });
}

export async function POST(request: Request) {
  const userId = await getDefaultUserId();
  const body = await request.json().catch(() => null);
  if (!body || typeof body.type !== "string") {
    return NextResponse.json({ error: "Missing MBTI type" }, { status: 400 });
  }
  const created = await prisma.mBTIResult.create({
    data: {
      userId,
      type: body.type,
      source: body.source ?? null,
    },
  });
  return NextResponse.json({ result: created }, { status: 201 });
}
