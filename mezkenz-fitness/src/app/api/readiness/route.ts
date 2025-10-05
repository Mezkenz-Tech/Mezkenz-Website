import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDefaultUserId } from "@/lib/user";

// Simple readiness heuristic combining sleep and resting HR
function computeReadiness(opts: { sleepHours?: number | null; heartRateBpm?: number | null }) {
  const sleep = opts.sleepHours ?? 0;
  const hr = opts.heartRateBpm ?? 60;
  let score = 50;
  if (sleep >= 8) score += 25;
  else if (sleep >= 7) score += 15;
  else if (sleep >= 6) score += 5;
  else score -= (6 - sleep) * 5;

  if (hr <= 55) score += 20;
  else if (hr <= 60) score += 10;
  else if (hr <= 70) score += 0;
  else score -= Math.min(20, (hr - 70));

  return Math.max(0, Math.min(100, Math.round(score)));
}

export async function GET() {
  const userId = await getDefaultUserId();
  const latest = await prisma.vitalsMeasurement.findFirst({
    where: { userId },
    orderBy: { timestamp: "desc" },
  });
  const readiness = computeReadiness({
    sleepHours: latest?.sleepHours,
    heartRateBpm: latest?.heartRateBpm,
  });
  return NextResponse.json({ readiness, latest });
}
