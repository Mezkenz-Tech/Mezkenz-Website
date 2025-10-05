import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDefaultUserId } from "@/lib/user";

export async function GET() {
  const userId = await getDefaultUserId();
  const workouts = await prisma.workout.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: true,
        },
      },
    },
    take: 20,
  });
  return NextResponse.json({ workouts });
}

type SetInput = {
  reps?: number;
  weightKg?: number;
  restSeconds?: number;
  rpe?: number;
  timeUnderTensionSec?: number;
  isWarmup?: boolean;
  notes?: string;
};

type WorkoutExerciseInput = {
  exerciseId: string;
  notes?: string;
  sets?: SetInput[];
};

type WorkoutPayload = {
  title?: string;
  notes?: string;
  durationSec?: number;
  date?: string;
  exercises: WorkoutExerciseInput[];
};

export async function POST(request: Request) {
  const userId = await getDefaultUserId();
  const body = (await request.json().catch(() => null)) as WorkoutPayload | null;
  if (!body || !Array.isArray(body.exercises)) {
    return NextResponse.json({ error: "Invalid workout payload" }, { status: 400 });
  }

  const created = await prisma.workout.create({
    data: {
      userId,
      title: body.title ?? null,
      notes: body.notes ?? null,
      durationSec: body.durationSec ?? null,
      date: body.date ? new Date(body.date) : new Date(),
      exercises: {
        create: body.exercises.map((we: WorkoutExerciseInput, idx: number) => ({
          exerciseId: we.exerciseId,
          order: idx + 1,
          notes: we.notes ?? null,
          sets: {
            create: (we.sets ?? []).map((s: SetInput, sIdx: number) => ({
              setNumber: sIdx + 1,
              reps: s.reps ?? null,
              weightKg: s.weightKg ?? null,
              restSeconds: s.restSeconds ?? null,
              rpe: s.rpe ?? null,
              timeUnderTensionSec: s.timeUnderTensionSec ?? null,
              isWarmup: Boolean(s.isWarmup),
              notes: s.notes ?? null,
            })),
          },
        })),
      },
    },
    include: {
      exercises: { include: { exercise: true, sets: true } },
    },
  });

  return NextResponse.json({ workout: created }, { status: 201 });
}
