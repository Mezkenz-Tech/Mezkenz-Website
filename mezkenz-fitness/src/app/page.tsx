export default function Home() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Welcome to Mezkenz Fitness</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <a href="/workouts" className="border rounded p-4 hover:bg-neutral-50">
          <h2 className="font-medium">Log Workout</h2>
          <p className="text-sm opacity-80">Track exercises, sets, reps, RPE, TUT.</p>
        </a>
        <a href="/vitals" className="border rounded p-4 hover:bg-neutral-50">
          <h2 className="font-medium">Log Vitals</h2>
          <p className="text-sm opacity-80">Heart rate, blood pressure, sleep, weight.</p>
        </a>
        <a href="/mbti" className="border rounded p-4 hover:bg-neutral-50">
          <h2 className="font-medium">MBTI</h2>
          <p className="text-sm opacity-80">Record MBTI and get routine ideas.</p>
        </a>
      </div>
    </div>
  );
}
