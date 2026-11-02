import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0105] text-white min-h-[677px] md:min-h-[max(794px,55.14vw)]">
      {/* Layers: photo, gradient (overlay blend), heading, crowd hands, paragraphs.
          Mobile: photo and hands keep their 375px-design size in px so the composition holds on every phone width.
          Hands anchor left like the heading (fingers never drift over it); photo anchors centre (wider screens show more sides). md+: cover. */}
      <div className="absolute -z-10 aspect-1710/2564 max-md:top-[-368px] max-md:left-[calc(50%-397.5px)] max-md:w-[889px] md:inset-0 md:aspect-auto">
        <Image src="/hero_content.jpg" alt="" fill preload sizes="(min-width: 768px) 100vw, 889px" className="object-cover" />
      </div>
      <Image
        src="/hero_gradasi.png"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="-z-10 object-cover mix-blend-overlay"
      />
      <div className="pointer-events-none absolute aspect-1440/794 max-md:bottom-0 max-md:left-[-368px] max-md:w-[1382px] md:inset-0 md:aspect-auto">
        <Image src="/hero_tangan.png" alt="" fill loading="eager" sizes="(min-width: 768px) 100vw, 1382px" className="object-cover object-bottom" />
      </div>

      <div className="wrapper pt-56.5 pb-20 md:pt-[max(296px,20.56vw)] md:pb-16">
        <div className="flex items-center gap-16 md:whitespace-nowrap">
          {/* Tablet: shrink with the viewport so "DIGILAND 2025" stays on one line above the hands (92px from ~880px up) */}
          <h1 className="font-display text-[38px] leading-none uppercase md:text-[min(92px,10.5vw)]">
            <span className="font-extrabold">Digiland</span>{" "}
            <span className="font-light">2025</span>
          </h1>
          <div aria-hidden className="hidden items-center gap-16 lg:flex">
            <span className="h-0.75 w-[105px] bg-white" />
            <span className="font-display text-[92px] leading-none font-extrabold text-transparent uppercase [-webkit-text-stroke:1px_#fff]">
              Digiland
            </span>
          </div>
        </div>

        {/* relative: paints above the hands layer, while the heading stays behind it */}
        <div className="relative mt-[141px] max-w-155 space-y-6 text-base leading-6 sm:space-y-7 sm:text-lg sm:leading-[1.6] md:mt-[max(168px,11.67vw)]">
          <p>
            Digiland 2025 hadir sebagai signature annual event Telkom Indonesia, menyajikan
            kegiatan yang inspiratif, inovatif dan menghibur masyarakat.
          </p>
          <p>
            Semangat #ElevatingYourFuture kembali melalui acara Digiland Run, Digiland Music,
            dan Pasar Rakyat UMKM.
          </p>
        </div>
      </div>
    </section>
  );
}
