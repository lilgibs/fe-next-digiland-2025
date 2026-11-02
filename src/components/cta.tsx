import Image from "next/image";
import ArrowLink from "@/components/arrow-link";
import { TICKET_URL } from "@/lib/site";

// lg: 45° bands anchored to the right edge (`right` = distance from the section's right edge to the band's centre at y=266).
// Below lg: the same bands run horizontally under the content (`band` = their background).
const RIBBONS = [
  {
    text: "#PasarRakyatDigiland  •  #DigilandRun  •  #DigilandMusic  •  ",
    right: 285,
    className: "bg-[rgb(110_105_150/0.65)]",
    band: "bg-[linear-gradient(90deg,rgb(110_105_150/0.05),rgb(110_105_150/0.8))]",
  },
  {
    text: "#Digiland2025  •  #ElevatingYourFuture  •  ",
    right: 89,
    className: "bg-[linear-gradient(90deg,#8f3d7f_26%,#ad216f_45%)]",
    band: "bg-[linear-gradient(90deg,#6c8bab,#8a4f8b_45%,#ad216f_80%)]",
  },
];

function Marquee({ text, className }: { text: string; className: string }) {
  return (
    <p className={`flex w-max animate-marquee leading-none font-medium whitespace-pre motion-reduce:animate-none ${className}`}>
      {/* two identical halves so the -50% marquee loops seamlessly */}
      {text.repeat(6)}
    </p>
  );
}

export default function Cta({ id, href = TICKET_URL }: { id?: string; href?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className="relative isolate overflow-hidden pt-20 pb-18 text-white md:pt-38 md:pb-32">
      <Image src="/bg_content_header.png" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <Image src="/content_gradasi.png" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-80" />

      {RIBBONS.map(({ text, right, className }) => (
        <div
          key={right}
          aria-hidden
          className={`absolute top-66.5 flex h-33.5 w-400 -translate-x-1/2 -translate-y-1/2 -rotate-45 items-center overflow-hidden max-lg:hidden ${className}`}
          style={{ left: `calc(100% - ${right}px)` }}
        >
          <Marquee text={text} className="text-[40px]" />
        </div>
      ))}

      <div className="wrapper relative">
        <h2 id={id ? `${id}-heading` : undefined} className="font-display text-2xl leading-8 font-extrabold uppercase md:text-[40px] md:leading-none">
          Dapatkan Tiketnya dengan Mudah
        </h2>
        {/* ponytail: mobile design names the Telkomsel website, desktop names MyTelkomsel; confirm which is current */}
        <p className="mt-2 text-base leading-6 md:mt-4 md:text-xl md:leading-7">
          di <span className="md:hidden">website Telkomsel</span>
          <span className="max-md:hidden">MyTelkomsel</span>, bersiap jadi bagian keseruan Digiland!
        </p>
        <Image src="/logo_telkomsel.png" alt="Telkomsel" width={185} height={53} className="mt-10 w-41.25 md:hidden" />
        <Image src="/logo_my_telkomsel.png" alt="MyTelkomsel" width={251} height={49} className="mt-11 max-md:hidden" />
        <div className="mt-10 md:mt-8">
          <ArrowLink href={href} icon="up-right">
            Beli Tiket
          </ArrowLink>
        </div>
      </div>

      <div aria-hidden className="mt-46.5 lg:hidden">
        {RIBBONS.map(({ text, band }) => (
          <div key={band} className={`flex h-20 items-center overflow-hidden ${band}`}>
            <Marquee text={text} className="text-2xl [word-spacing:0.25em]" />
          </div>
        ))}
      </div>
    </section>
  );
}
