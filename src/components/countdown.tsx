"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

// ponytail: placeholder date, replace with the real event start
const EVENT_START = Date.parse("2027-01-20T06:00:00+07:00") / 1000;

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const nowSeconds = () => Math.floor(Date.now() / 1000);

export default function Countdown() {
  // Server snapshot is null: time is only read in the browser (prerender-safe, no hydration mismatch)
  const now = useSyncExternalStore(subscribe, nowSeconds, () => null);
  const left = now === null ? null : Math.max(0, EVENT_START - now);

  const values =
    left === null
      ? []
      : [
          Math.floor(left / 86400),
          Math.floor((left % 86400) / 3600),
          Math.floor((left % 3600) / 60),
          left % 60,
        ];

  return (
    <div className="@container relative mx-auto w-full max-w-292.25">
      {/* Mobile: full-bleed blob with a 2×2 grid; md+: wide blob with 4 columns. Hidden one stays unloaded (lazy). */}
      <Image src="/countdown_blob_mobile.png" alt="" width={375} height={398} className="w-full md:hidden" />
      <Image src="/countdown_blob.png" alt="" width={1169} height={399} className="hidden w-full md:block" />
      <div
        role="timer"
        aria-label="Hitung mundur Digiland 2025"
        className="absolute inset-x-0 top-[13.15cqw] grid grid-cols-2 gap-y-[10.6cqw] text-center text-white md:top-[31%] md:left-[11.3%] md:w-[76.6%] md:grid-cols-4 md:gap-y-0"
      >
        {["Hari", "Jam", "Menit", "Detik"].map((label, i) => {
          const value = values[i];
          return (
            <div key={label} className="flex flex-col items-center gap-[8.3cqw] md:gap-[2.75cqw]">
              <span className="font-display text-[18.3cqw] leading-none font-medium tabular-nums md:text-[5.8cqw]">
                {value === undefined ? "--" : i === 0 ? value : String(value).padStart(2, "0")}
              </span>
              <span className="text-[7.6cqw] leading-none uppercase md:text-[max(11px,2.45cqw)]">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
