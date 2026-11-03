import Image from "next/image";
import ArrowLink from "@/components/arrow-link";

const TALL = "aspect-368/481";
const WIDE = "aspect-368/245";

type Tile = { src: string; aspect: string; ghost?: boolean; pos?: string; alt?: string };

// md+: three 368px columns cut off at 1028px; full-colour photos sit between faded "ghost" ones.
const COLUMNS: { offset: string; tiles: Tile[] }[] = [
  {
    offset: "lg:-mt-[65px]",
    tiles: [
      { src: "/content.jpg", aspect: "aspect-square", ghost: true },
      { src: "/pasar/stand.png", aspect: TALL, pos: "15% 50%", alt: "Stand UMKM Forsikatel di Pasar Rakyat" },
      { src: "/pasar/poin-festival.png", aspect: TALL, ghost: true },
    ],
  },
  {
    offset: "lg:-mt-[102px] max-lg:col-span-2 max-lg:order-last",
    tiles: [
      { src: "/pasar/stand.png", aspect: TALL, ghost: true },
      { src: "/pasar/poin-festival.png", aspect: WIDE, alt: "Pengunjung di deretan booth kuliner Pasar Rakyat" },
      { src: "/pasar/stand.png", aspect: TALL, ghost: true, pos: "16% 50%" },
    ],
  },
  {
    offset: "",
    tiles: [
      { src: "/pasar/stand.png", aspect: TALL, pos: "100% 50%", alt: "Pengunjung membeli jajanan di booth UMKM" },
      { src: "/pasar/poin-festival.png", aspect: "aspect-368/560", ghost: true },
    ],
  },
];

// Mobile: full-bleed collage of 121px columns, positions in px from the 375px design (converted to vw so it
// scales with the phone). Tiles without alt are ghosts.
const MOBILE_TILES: { src: string; x: number; y: number; h: number; pos?: string; alt?: string }[] = [
  { src: "/content.jpg", x: 0, y: 0, h: 215 },
  { src: "/pasar/stand.png", x: 0, y: 227, h: 251, pos: "33% 50%", alt: "Stand UMKM Forsikatel di Pasar Rakyat" },
  { src: "/pasar/poin-festival.png", x: 0, y: 490, h: 200 },
  { src: "/pasar/poin-festival.png", x: 127, y: -40, h: 214 },
  { src: "/pasar/stand.png", x: 127, y: 186, h: 288 },
  { src: "/content.jpg", x: 127, y: 486, h: 200 },
  { src: "/pasar/stand.png", x: 254, y: 0, h: 180, pos: "91% 50%", alt: "Pengunjung membeli jajanan di booth UMKM" },
  { src: "/pasar/poin-festival.png", x: 254, y: 192, h: 288 },
  { src: "/pasar/stand.png", x: 254, y: 492, h: 200 },
];
const vw = (px: number) => `${(px / 3.75).toFixed(2)}vw`;

export default function Pasar() {
  return (
    <section className="relative overflow-hidden bg-white bg-[radial-gradient(220px_380px_at_0%_560px,#e9e1ea,transparent),radial-gradient(200px_260px_at_100%_560px,#e5dfe9,transparent)] md:py-16 lg:py-0">
      <div className="wrapper relative">
        <h2 className="font-display leading-none uppercase max-md:absolute max-md:top-[20.27vw] max-md:left-4 max-md:z-10 lg:absolute lg:top-32.5 lg:left-4 lg:z-10">
          <span className="block w-min bg-[radial-gradient(70%_45%_at_0%_100%,#61677d,transparent),radial-gradient(60%_45%_at_100%_100%,#787890,transparent),linear-gradient(#5e1b4d,#5e1b4d)] bg-clip-text text-[44px] leading-[38px] font-extrabold text-transparent md:w-fit md:bg-[linear-gradient(90deg,#5e1e4e,#45bfc3_22%,#45bfc3_32%,#8a2468_85%,#8f5a86)] md:text-[63px] md:leading-15">
            Pasar Rakyat
          </span>
          <span className="mt-2 block text-xl font-semibold text-transparent [-webkit-text-stroke:1px_#333] md:mt-6.5 md:text-[31px]">
            UMKM
          </span>
        </h2>

        <div className="relative -mx-4 h-[147.47vw] overflow-hidden md:hidden">
          {MOBILE_TILES.map((t, i) => (
            <div
              key={i}
              className={`absolute overflow-hidden ${t.alt ? "" : "opacity-10"}`}
              style={{ left: vw(t.x), top: vw(t.y), width: vw(121), height: vw(t.h) }}
            >
              <Image
                src={t.src}
                alt={t.alt ?? ""}
                fill
                sizes="33vw"
                className="object-cover"
                style={t.pos ? { objectPosition: t.pos } : undefined}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 max-md:hidden lg:mt-0 lg:h-257 lg:grid-cols-3 lg:gap-6 lg:overflow-hidden">
          {COLUMNS.map(({ offset, tiles }, c) => (
            <div key={c} className={`flex flex-col gap-6 ${offset}`}>
              {tiles.map((t, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden ${t.aspect} ${t.ghost ? "opacity-10 max-lg:hidden" : ""}`}
                >
                  <Image
                    src={t.src}
                    alt={t.ghost ? "" : (t.alt ?? "")}
                    fill
                    sizes="(min-width: 1024px) 368px, 50vw"
                    className="object-cover"
                    style={t.pos ? { objectPosition: t.pos } : undefined}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile width keeps the text clear of the first tile column (32.3vw + 8px gap + 16px inset) */}
        <div className="flex flex-col text-ink max-md:absolute max-md:top-[60.8vw] max-md:right-4 max-md:max-w-[min(13.75rem,calc(67.7vw-24px))] max-[359px]:text-sm max-md:items-end max-md:text-right max-md:leading-6 md:mt-10 md:items-start md:text-xl md:leading-[1.4] lg:absolute lg:top-169.25 lg:right-4 lg:mt-0 lg:max-w-97.5 lg:items-end lg:text-right">
          <div className="space-y-5 md:space-y-7">
            <p>
              Nikmati jajanan <strong>#PasarRakyatDigiland</strong> di acara <strong>#DIGILAND 2025</strong>.
            </p>
            <p>Jangan lupa beli yang banyak ya untuk membantu para UMKM di Indonesia!!</p>
          </div>
          <div className="mt-7 md:mt-11">
            <ArrowLink href="/pasar-rakyat" icon="up-right">
              Selengkapnya
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
