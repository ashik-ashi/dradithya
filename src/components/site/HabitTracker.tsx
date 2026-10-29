import { useEffect, useState } from "react";
import { Lightbulb, RotateCcw } from "lucide-react";
import { HABITS, WEEKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STORAGE_KEY = "dr-adithya-habit-tracker-v1";
const emptyGrid = () => HABITS.map(() => WEEKS.map(() => false));

function HabitCheck({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      data-state={checked ? "checked" : "unchecked"}
      onClick={onToggle}
      className={cn(
        "grid size-11 place-items-center rounded-xl border-2 transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        checked
          ? "border-forest bg-forest text-forest-foreground shadow-soft"
          : "border-input bg-paper text-transparent hover:border-sage hover:bg-sage-mist",
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
        {checked && (
          <path
            className="check-path"
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

export function HabitTracker() {
  const [grid, setGrid] = useState<boolean[][]>(emptyGrid);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (
        Array.isArray(saved) &&
        saved.length === HABITS.length &&
        saved.every((r) => Array.isArray(r) && r.length === WEEKS.length)
      ) {
        setGrid(saved);
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const update = (next: boolean[][]) => {
    setGrid(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  };

  const toggle = (h: number, w: number) =>
    update(grid.map((row, ri) => (ri === h ? row.map((v, wi) => (wi === w ? !v : v)) : row)));

  const total = HABITS.length * WEEKS.length;
  const done = grid.flat().filter(Boolean).length;

  return (
    <section id="tracker" aria-labelledby="tracker-title" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="tracker-title"
          eyebrow="Track your progress"
          title="4-Week Habit Tracker"
          subtitle="Tick each habit as you keep it up through the week. Your progress stays saved on this device."
        />

        <Reveal className="mt-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div
                className="h-2 w-full max-w-60 overflow-hidden rounded-full bg-sage-soft"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={done}
                aria-label="Habits completed"
              >
                <div
                  className="h-full origin-left rounded-full bg-forest transition-transform duration-500 ease-out"
                  style={{ transform: `scaleX(${done / total})` }}
                />
              </div>
              <p className="shrink-0 text-sm font-medium text-forest">
                {done} / {total}
              </p>
            </div>
            <button
              type="button"
              onClick={() => update(emptyGrid())}
              disabled={done === 0}
              className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-sage-mist hover:text-forest disabled:pointer-events-none disabled:opacity-40"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Reset
            </button>
          </div>

          {/* Desktop / tablet table */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-soft sm:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-sage-soft">
                  <th scope="col" className="px-6 py-4 text-sm font-bold text-forest-deep">
                    Habit
                  </th>
                  {WEEKS.map((w) => (
                    <th
                      key={w}
                      scope="col"
                      className="px-3 py-4 text-center text-sm font-semibold text-forest-deep"
                    >
                      {w}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HABITS.map((habit, h) => (
                  <tr key={habit} className="border-t border-border odd:bg-paper even:bg-sage-mist/50">
                    <th scope="row" className="px-6 py-3 text-[0.95rem] font-medium text-foreground">
                      {habit}
                    </th>
                    {WEEKS.map((w, wi) => (
                      <td key={w} className="px-3 py-3">
                        <div className="flex justify-center">
                          <HabitCheck
                            checked={grid[h][wi]}
                            label={`${habit} – ${w}`}
                            onToggle={() => toggle(h, wi)}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-3 sm:hidden">
            {HABITS.map((habit, h) => (
              <li key={habit} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                <p className="font-medium text-foreground">{habit}</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {WEEKS.map((w, wi) => (
                    <div key={w} className="flex flex-col items-center gap-1.5">
                      <HabitCheck
                        checked={grid[h][wi]}
                        label={`${habit} – ${w}`}
                        onToggle={() => toggle(h, wi)}
                      />
                      <span className="text-[0.7rem] font-medium text-muted-foreground" aria-hidden="true">
                        {w.replace("Week ", "Wk ")}
                      </span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-gold/30 bg-sage-mist p-5 sm:items-center sm:p-6">
            <span className="icon-badge size-11 bg-paper text-gold">
              <Lightbulb className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="eyebrow text-forest">Remember</p>
              <p className="mt-1 font-display text-lg text-forest-deep">
                Progress takes time. Be consistent, not perfect!
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
