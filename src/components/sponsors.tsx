import Image from "next/image";

const SPONSORS = [
  { name: "Brooks", src: "/sponsors/brooks.png", width: 256, height: 32 },
  { name: "BRI Life", src: "/sponsors/brilife.png", width: 200, height: 56 },
  { name: "Crystalin", src: "/sponsors/crystalin.png", width: 170, height: 56 },
  { name: "Sunpride", src: "/sponsors/sunpride.png", width: 101, height: 56 },
  { name: "Isoplus", src: "/sponsors/isoplus.png", width: 200, height: 56 },
  { name: "OT", src: "/sponsors/ot.png", width: 114, height: 60 },
];

// Mobile: 3-column grid; lg: one row spread edge to edge (20px inset), as in the 1440 design.
export default function Sponsors({ title = "Sponsor dan Partner" }: { title?: string }) {
  return (
    <section className="overflow-hidden bg-white py-16 md:pt-30.5 md:pb-42">
      <div className="wrapper">
        <h2 className="font-display text-[28px] leading-none font-extrabold text-[#333] uppercase md:text-[40px]">
          {title}
        </h2>
      </div>

      <ul aria-label="Sponsor dan partner" className="mt-12 grid grid-cols-3 items-center justify-items-center gap-x-6 gap-y-9 px-5 lg:mt-26 lg:flex lg:justify-between">
        {SPONSORS.map((sponsor) => (
          <li key={sponsor.name} className="min-w-0">
            <Image src={sponsor.src} alt={sponsor.name} width={sponsor.width} height={sponsor.height} className="h-auto max-h-15 max-w-full object-contain" />
          </li>
        ))}
      </ul>
    </section>
  );
}
