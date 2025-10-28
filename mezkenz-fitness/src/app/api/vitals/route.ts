import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDefaultUserId } from "@/lib/user";

export async function GET() {
  const userId = await getDefaultUserId();
  const vitals = await prisma.vitalsMeasurement.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 30,
  });
  return NextResponse.json({ vitals });
}

export async function POST(request: Request) {
  const userId = await getDefaultUserId();
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const created = await prisma.vitalsMeasurement.create({
    data: {
      userId,
      heartRateBpm: body.heartRateBpm ?? null,
      systolicMmHg: body.systolicMmHg ?? null,
      diastolicMmHg: body.diastolicMmHg ?? null,
      spo2Percent: body.spo2Percent ?? null,
      bodyWeightKg: body.bodyWeightKg ?? null,
      sleepHours: body.sleepHours ?? null,
      readinessScore: body.readinessScore ?? null,
      notes: body.notes ?? null,
    },
  });

  return NextResponse.json({ vitals: created }, { status: 201 });
}
