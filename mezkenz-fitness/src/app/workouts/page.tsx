"use client";
import { useEffect, useState } from "react";

type Exercise = {
  id: string;
  name: string;
};

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
  sets: SetInput[];
};

export default function WorkoutsPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [items, setItems] = useState<WorkoutExerciseInput[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/exercises")
      .then((r) => r.json())
      .then((data) => setExercises(data.exercises ?? []));
  }, []);

  function addExercise() {
    const first = exercises[0];
    if (!first) return;
    setItems((prev) => [...prev, { exerciseId: first.id, sets: [] }]);
  }

  function addSet(idx: number) {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], sets: [...next[idx].sets, {}] };
      return next;
    });
  }

  async function saveWorkout() {
    setIsSaving(true);
    setResponse(null);
    try {
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: workoutTitle || undefined,
          notes: workoutNotes || undefined,
          exercises: items,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setResponse("Saved workout");
      setItems([]);
      setWorkoutTitle("");
      setWorkoutNotes("");
    } catch (e: any) {
      setResponse(e.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Log Workout</h1>
      <div className="grid gap-2">
        <input
          className="border rounded px-3 py-2"
          placeholder="Title (optional)"
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
        />
        <textarea
          className="border rounded px-3 py-2"
          placeholder="Notes (optional)"
          value={workoutNotes}
          onChange={(e) => setWorkoutNotes(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="border rounded px-3 py-2" onClick={addExercise} disabled={!exercises.length}>
          Add Exercise
        </button>
        <span className="text-sm opacity-70">{exercises.length} exercises available</span>
      </div>
      <div className="grid gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="border rounded p-3 grid gap-2">
            <div className="flex items-center gap-2">
              <select
                className="border rounded px-2 py-1"
                value={item.exerciseId}
                onChange={(e) =>
                  setItems((prev) => {
                    const next = [...prev];
                    next[idx] = { ...next[idx], exerciseId: e.target.value };
                    return next;
                  })
                }
              >
                {exercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
              <button className="text-sm opacity-70 hover:opacity-100" onClick={() => addSet(idx)}>
                + Set
              </button>
            </div>
            {item.sets.map((s, sIdx) => (
              <div key={sIdx} className="grid sm:grid-cols-6 gap-2">
                <input
                  type="number"
                  className="border rounded px-2 py-1"
                  placeholder="Reps"
                  value={s.reps ?? ""}
                  onChange={(e) =>
                    setItems((prev) => {
                      const next = [...prev];
                      const sets = [...next[idx].sets];
                      sets[sIdx] = { ...sets[sIdx], reps: Number(e.target.value) };
                      next[idx] = { ...next[idx], sets };
                      return next;
                    })
                  }
                />
                <input
                  type="number"
                  className="border rounded px-2 py-1"
                  placeholder="Weight (kg)"
                  value={s.weightKg ?? ""}
                  onChange={(e) =>
                    setItems((prev) => {
                      const next = [...prev];
                      const sets = [...next[idx].sets];
                      sets[sIdx] = { ...sets[sIdx], weightKg: Number(e.target.value) };
                      next[idx] = { ...next[idx], sets };
                      return next;
                    })
                  }
                />
                <input
                  type="number"
                  className="border rounded px-2 py-1"
                  placeholder="Rest (sec)"
                  value={s.restSeconds ?? ""}
                  onChange={(e) =>
                    setItems((prev) => {
                      const next = [...prev];
                      const sets = [...next[idx].sets];
                      sets[sIdx] = { ...sets[sIdx], restSeconds: Number(e.target.value) };
                      next[idx] = { ...next[idx], sets };
                      return next;
                    })
                  }
                />
                <input
                  type="number"
                  step="0.5"
                  className="border rounded px-2 py-1"
                  placeholder="RPE"
                  value={s.rpe ?? ""}
                  onChange={(e) =>
                    setItems((prev) => {
                      const next = [...prev];
                      const sets = [...next[idx].sets];
                      sets[sIdx] = { ...sets[sIdx], rpe: Number(e.target.value) };
                      next[idx] = { ...next[idx], sets };
                      return next;
                    })
                  }
                />
                <input
                  type="number"
                  className="border rounded px-2 py-1"
                  placeholder="TUT (sec)"
                  value={s.timeUnderTensionSec ?? ""}
                  onChange={(e) =>
                    setItems((prev) => {
                      const next = [...prev];
                      const sets = [...next[idx].sets];
                      sets[sIdx] = { ...sets[sIdx], timeUnderTensionSec: Number(e.target.value) };
                      next[idx] = { ...next[idx], sets };
                      return next;
                    })
                  }
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(s.isWarmup)}
                    onChange={(e) =>
                      setItems((prev) => {
                        const next = [...prev];
                        const sets = [...next[idx].sets];
                        sets[sIdx] = { ...sets[sIdx], isWarmup: e.target.checked };
                        next[idx] = { ...next[idx], sets };
                        return next;
                      })
                    }
                  />
                  Warmup
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button className="border rounded px-3 py-2" onClick={saveWorkout} disabled={isSaving || !items.length}>
          {isSaving ? "Saving..." : "Save Workout"}
        </button>
        {response && <span className="text-sm opacity-80">{response}</span>}
      </div>
    </div>
  );
}
