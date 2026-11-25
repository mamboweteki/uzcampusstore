"use client";

import { useEffect, useState } from "react";
import { LAUNCH_DATE } from "@/lib/constants";

const TICK_INTERVAL_MS = 1000;

/** Animated countdown to the official UZ Marketplace launch date. */
export default function Countdown() {
  const [now, setNow] = useState(() => LAUNCH_DATE.getTime());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), TICK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const target = LAUNCH_DATE.getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor(diff / 3_600_000) % 24;
  const minutes = Math.floor(diff / 60_000) % 60;
  const seconds = Math.floor(diff / 1_000) % 60;

  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex min-w-[4.5rem] flex-col items-center justify-center rounded-2xl bg-white/5 px-4 py-4 ring-1 ring-white/10 backdrop-blur-sm sm:min-w-[6rem] sm:px-6"
        >
          <span className="font-display text-3xl font-bold tabular-nums text-white sm:text-5xl">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widest text-royal-300">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
