import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const exercises = [
    { name: "Back Squat", category: "Strength", bodyPart: "Legs", equipment: "Barbell", defaultRestSeconds: 180, defaultTempo: "3-1-1" },
    { name: "Bench Press", category: "Strength", bodyPart: "Chest", equipment: "Barbell", defaultRestSeconds: 180, defaultTempo: "3-1-1" },
    { name: "Deadlift", category: "Strength", bodyPart: "Back", equipment: "Barbell", defaultRestSeconds: 240, defaultTempo: "2-1-1" },
    { name: "Overhead Press", category: "Strength", bodyPart: "Shoulders", equipment: "Barbell", defaultRestSeconds: 150, defaultTempo: "2-1-1" },
    { name: "Pull-Up", category: "Strength", bodyPart: "Back", equipment: "Bodyweight", defaultRestSeconds: 120, defaultTempo: "2-1-2" },
    { name: "Bent-Over Row", category: "Strength", bodyPart: "Back", equipment: "Barbell", defaultRestSeconds: 150, defaultTempo: "2-1-2" },
    { name: "Dumbbell Curl", category: "Hypertrophy", bodyPart: "Arms", equipment: "Dumbbell", defaultRestSeconds: 60, defaultTempo: "3-1-2" },
    { name: "Triceps Pushdown", category: "Hypertrophy", bodyPart: "Arms", equipment: "Cable", defaultRestSeconds: 60, defaultTempo: "2-1-2" },
    { name: "Leg Press", category: "Hypertrophy", bodyPart: "Legs", equipment: "Machine", defaultRestSeconds: 90, defaultTempo: "3-1-2" },
    { name: "Romanian Deadlift", category: "Hypertrophy", bodyPart: "Back", equipment: "Barbell", defaultRestSeconds: 120, defaultTempo: "3-1-2" }
  ];

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { name: exercise.name },
      create: exercise,
      update: exercise,
    });
  }

  // Seed a demo user
  await prisma.user.upsert({
    where: { email: "demo@mezkenz.fit" },
    update: {},
    create: { email: "demo@mezkenz.fit", name: "Demo User" },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
