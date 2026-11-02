import Image from "next/image";
import { Fragment } from "react";

const EVENTS = ["Pasar Rakyat", "Digiland Run", "Digiland Music"];

function Dash() {
  return <span className="h-0.75 w-6 shrink-0 bg-white md:h-1 md:w-26.25" />;
}

// One half of the marquee: EVENT — DIGILAND(outline) — ...; rendered twice so -50% loops seamlessly
function MarqueeHalf() {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6 md:gap-16 md:pr-16">
      {EVENTS.map((name) => (
        <Fragment key={name}>
          <span className="font-extrabold">{name}</span>
          <Dash />
          <span className="font-extrabold text-transparent [-webkit-text-stroke:1px_#fff]">Digiland</span>
          <Dash />
        </Fragment>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden pt-10 pb-9 text-white md:pt-14">
      <Image src="/hero_gradasi.png" alt="" fill sizes="100vw" className="-z-10 object-cover" />

      <div className="wrapper flex items-start justify-between gap-6">
        <Image src="/logo_telkomsel.png" alt="Telkomsel" width={185} height={53} className="mt-5 max-md:w-22 md:mt-4.5" />
        <Image src="/logo_telkom.png" alt="Telkom Indonesia" width={128} height={89} className="mr-2 max-md:w-[73px] md:mr-3" />
      </div>

      <Image
        src="/dgld-digiland-2025.svg"
        alt="Digiland 2025"
        width={303}
        height={221}
        className="mx-auto mt-49 max-md:w-62 md:mt-19.25"
      />

      {/* Mobile: 196px above the logo, 192px below; the marquee caps sit ~5px into their line box, so both gaps read equal */}

      <div
        aria-hidden
        className="mt-48 flex w-max animate-marquee font-display text-[40px] leading-none whitespace-nowrap uppercase motion-reduce:animate-none md:mt-32.25 md:text-[92px]"
        style={{ animationDuration: "90s" }}
      >
        <MarqueeHalf />
        <MarqueeHalf />
      </div>

      <p className="mt-11.5 text-center text-sm md:mt-14.5">Copyright © 2025 Digiland. All Rights Reserved.</p>
    </footer>
  );
}
