import Image from "next/image";
import ArrowLink from "@/components/arrow-link";
import { TICKET_URL } from "@/lib/site";

const ARTISTS = [
  { name: "Bernadya", src: "/artists/bernadya.png", width: 282, height: 366 },
  { name: "Tiara Andini", src: "/artists/tiara-andini.png", width: 279, height: 354 },
  { name: "Project Pop", src: "/artists/project-pop.png", width: 288, height: 376 },
  { name: "JKT48", src: "/artists/jkt48.png", width: 282, height: 366 },
];
const HALF = Math.ceil(ARTISTS.length / 2);

// Marquee row: two identical halves animated to -50%; each half repeats the list enough to cover a 2560px screen.
function Row({ artists, className = "" }: { artists: typeof ARTISTS; className?: string }) {
  const copies = Math.ceil(2560 / (artists.length * 290));
  const track = Array.from({ length: copies * 2 }, () => artists).flat();
  return (
    <ul
      aria-label="Line-up Festival Musik"
      className={`flex w-max animate-marquee items-center hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:overflow-x-auto ${className}`}
      style={{ animationDuration: `${track.length * 3}s` }}
    >
      {track.map((artist, i) => {
        const copy = i >= artists.length;
        return (
          // pr instead of gap: keeps both halves exactly equal so -50% loops seamlessly
          <li key={i} aria-hidden={copy || undefined} className={`shrink-0 pr-2.5 ${copy ? "motion-reduce:hidden" : ""}`}>
            <Image src={artist.src} alt={copy ? "" : artist.name} width={artist.width} height={artist.height} />
          </li>
        );
      })}
    </ul>
  );
}

export default function Music() {
  return (
    <section className="relative isolate overflow-hidden pt-11 pb-20 md:pt-25 md:pb-32">
      <Image src="/bg_content_header.png" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <Image src="/content_gradasi.png" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-70" />

      <div className="wrapper flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-[30px] leading-none font-extrabold text-white uppercase md:text-[40px]">
          Festival Musik
        </h2>
        <div className="max-md:hidden">
          <ArrowLink href={TICKET_URL}>Beli Tiketnya</ArrowLink>
        </div>
      </div>

      <div className="mt-16 md:mt-15">
        <Row artists={ARTISTS} className="max-md:hidden" />
        {/* Mobile: two staggered rows at 67% card size, second row running the other way */}
        <div className="space-y-2.5 [zoom:0.67] md:hidden">
          <Row artists={ARTISTS.slice(0, HALF)} className="motion-safe:ml-10" />
          <Row artists={ARTISTS.slice(HALF)} className="[animation-direction:reverse] motion-safe:-ml-36" />
        </div>
      </div>

      {/* ponytail: target page for the line-up isn't defined yet */}
      <div className="wrapper mt-14 flex justify-end md:hidden">
        <ArrowLink href="/festival-musik" icon="up-right">
          <span className="font-display font-bold uppercase">Line Up Musik</span>
        </ArrowLink>
      </div>
    </section>
  );
}
