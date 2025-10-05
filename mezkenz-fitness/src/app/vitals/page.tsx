"use client";
import { useEffect, useState } from "react";

type Vitals = {
  heartRateBpm?: number;
  systolicMmHg?: number;
  diastolicMmHg?: number;
  spo2Percent?: number;
  bodyWeightKg?: number;
  sleepHours?: number;
  readinessScore?: number;
  notes?: string;
};

export default function VitalsPage() {
  const [vitals, setVitals] = useState<Vitals>({});
  const [lastReadiness, setLastReadiness] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/readiness")
      .then((r) => r.json())
      .then((data) => setLastReadiness(data.readiness ?? null))
      .catch(() => {});
  }, []);

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/vitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vitals),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setMsg("Saved vitals");
      const next = await (await fetch("/api/readiness")).json();
      setLastReadiness(next.readiness ?? null);
      setVitals({});
  } catch (e) {
      const message = e instanceof Error ? e.message : "Failed";
      setMsg(message);
    } finally {
      setSaving(false);
    }
  }

  function inputNum(name: keyof Vitals, placeholder: string, step?: string) {
    return (
      <input
        type="number"
        step={step ?? "1"}
        className="border rounded px-3 py-2"
        placeholder={placeholder}
        value={(vitals[name] as number | undefined) ?? ""}
        onChange={(e) => setVitals((v) => ({ ...v, [name]: e.target.value ? Number(e.target.value) : undefined }))}
      />
    );
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Vitals</h1>
      <div className="grid sm:grid-cols-3 gap-2">
        {inputNum("heartRateBpm", "Resting HR (bpm)")}
        {inputNum("systolicMmHg", "Systolic (mmHg)")}
        {inputNum("diastolicMmHg", "Diastolic (mmHg)")}
        {inputNum("spo2Percent", "SpO2 (%)")}
        {inputNum("bodyWeightKg", "Weight (kg)", "0.1")}
        {inputNum("sleepHours", "Sleep (hours)", "0.25")}
      </div>
      <textarea
        className="border rounded px-3 py-2"
        placeholder="Notes"
        value={vitals.notes ?? ""}
        onChange={(e) => setVitals((v) => ({ ...v, notes: e.target.value }))}
      />
      <div className="flex items-center gap-2">
        <button className="border rounded px-3 py-2" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        {msg && <span className="text-sm opacity-80">{msg}</span>}
      </div>
      <div className="text-sm opacity-80">Readiness: {lastReadiness ?? "N/A"}</div>
    </div>
  );
}
