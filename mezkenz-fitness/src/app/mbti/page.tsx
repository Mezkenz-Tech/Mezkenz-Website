"use client";
import { useEffect, useMemo, useState } from "react";

const types = [
  "INTJ","INTP","ENTJ","ENTP",
  "INFJ","INFP","ENFJ","ENFP",
  "ISTJ","ISFJ","ESTJ","ESFJ",
  "ISTP","ISFP","ESTP","ESFP",
];

function getRoutineIdea(type: string) {
  const groups: Record<string, string> = {
    NT: "Strength + Progressive Overload (metrics-driven)",
    NF: "Mindful Training + Mobility on rest days",
    SJ: "Structured Full-Body Splits + Steady-state cardio",
    SP: "Varied Circuits + Sprints/Agility work",
  };
  if (["INTJ","INTP","ENTJ","ENTP"].includes(type)) return groups.NT;
  if (["INFJ","INFP","ENFJ","ENFP"].includes(type)) return groups.NF;
  if (["ISTJ","ISFJ","ESTJ","ESFJ"].includes(type)) return groups.SJ;
  return groups.SP;
}

export default function MBTIPage() {
  const [selected, setSelected] = useState<string>(types[0]);
  type MBTIEntry = { id: string; type: string; assessedAt: string };
  const [history, setHistory] = useState<MBTIEntry[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/mbti").then((r) => r.json()).then((d) => setHistory(d.results ?? []));
  }, []);

  async function save() {
    setMsg(null);
    const res = await fetch("/api/mbti", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: selected, source: "manual" }),
    });
    const data = await res.json();
    setMsg(res.ok ? "Saved" : data.error || "Failed");
    if (res.ok) setHistory((h) => [data.result as MBTIEntry, ...h]);
  }

  const idea = useMemo(() => getRoutineIdea(selected), [selected]);

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">MBTI</h1>
      <div className="flex items-center gap-2">
        <select className="border rounded px-3 py-2" value={selected} onChange={(e) => setSelected(e.target.value)}>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="border rounded px-3 py-2" onClick={save}>Save</button>
        {msg && <span className="text-sm opacity-80">{msg}</span>}
      </div>
      <div className="border rounded p-3">
        <div className="font-medium">Routine suggestion</div>
        <div className="text-sm opacity-80">{idea}</div>
      </div>
      <div className="grid gap-2">
        <div className="font-medium">History</div>
        <ul className="text-sm">
          {history.map((h) => (
            <li key={h.id} className="flex items-center justify-between border-b py-1">
              <span>{h.type}</span>
              <span className="opacity-70">{new Date(h.assessedAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
