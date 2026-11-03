import type { Metadata } from "next";
import Image from "next/image";
import EventInformation from "@/components/digiland-run/event-information";
import { BagArtwork, BibArtwork, JerseyArtwork, Medal } from "@/components/digiland-run/run-artwork";
import RunDialog from "@/components/digiland-run/run-dialogs";
import RunHero from "@/components/digiland-run/run-hero";
import { ArrowIcon, GUTTER, PAGE, TITLE, TITLE_FONT, runButton } from "@/components/digiland-run/run-ui";
import Footer from "@/components/footer";
import Cta from "@/components/cta";
import Sponsors from "@/components/sponsors";

export const metadata: Metadata = {
  title: "Digiland Run 2025 | Lari untuk Bahagia",
  description: "Lari untuk bahagia di Digiland Run 2025. Temukan kategori 5K, 10K, Half Marathon, informasi racepack, dan panduan acara 18 Mei 2025 di Istora Senayan, Jakarta.",
};

const RACES = [
  {
    category: "HM",
    price: "550.000",
    benefits: ["BIB", "Jersey", "Medal Finisher", "Jersey Finisher"],
    className: "bg-[radial-gradient(ellipse_at_100%_69%,#61d3d0_0,transparent_45%),linear-gradient(126deg,#91216f,#591344_72%,#5d3a65)]",
  },
  {
    category: "10K",
    price: "400.000",
    benefits: ["BIB", "Jersey", "Medal Finisher"],
    className: "bg-[radial-gradient(ellipse_at_30%_45%,#21bec1_0,transparent_62%),linear-gradient(155deg,#38677e,#219da9_53%,#7c1d5c_85%)] max-lg:bg-[radial-gradient(ellipse_at_8%_66%,#49c6c9,transparent_70%),linear-gradient(150deg,#38677e,#13848b_60%,#8c2b6a)] max-lg:before:-bottom-[3%] max-lg:before:-left-[10%] max-lg:before:h-[22%] max-lg:before:w-[120%] max-lg:before:-rotate-4 max-lg:before:opacity-65 max-lg:before:blur-[4px]",
  },
  {
    category: "5K",
    price: "350.000",
    benefits: ["BIB", "Jersey", "Medal Finisher"],
    className: "bg-[radial-gradient(ellipse_at_62%_88%,#5bd3d2_0,transparent_44%),linear-gradient(120deg,#156e6e,#25a4a4_46%,#9e216d_85%)]",
  },
] as const;

// Below lg each card scales with its own width (cqw), like the mobile reference
const RACE_CARD =
  "@container relative isolate min-h-[328px] overflow-hidden text-white max-xl:min-h-[315px] max-lg:mx-auto max-lg:aspect-[1.145] max-lg:w-full max-lg:max-w-160 max-lg:min-h-0 before:absolute before:-bottom-[28%] before:-left-[20%] before:-z-1 before:h-[55%] before:w-[140%] before:-rotate-13 before:bg-[#aa1a6c] before:opacity-45 before:blur-[26px]";

function RaceCards() {
  return (
    <div className="mt-16.5 grid grid-cols-3 gap-12 max-xl:gap-7 max-lg:mt-10.5 max-lg:grid-cols-1 max-lg:gap-6" id="kategori-lari">
      {RACES.map((race) => (
        <article key={race.category} className={`${RACE_CARD} ${race.className}`} aria-label={`Kategori ${race.category}, Rp${race.price}`}>
          <div className="relative z-2 px-7 py-6 max-xl:px-5 max-xl:py-6.25 max-lg:px-[7cqw] max-lg:py-[4.5cqw]">
            <h3 className="font-display text-[74px] leading-[1.1] font-black tracking-[-3px] max-xl:text-[62px] max-lg:text-[22cqw] max-lg:tracking-[-.8cqw]">{race.category}</h3>
            <p className="text-[24px] leading-[1.5] font-medium max-xl:text-[22px] max-lg:mt-[2.5cqw] max-lg:text-[6.4cqw] max-lg:font-normal max-lg:tracking-[-.25cqw]">Rp{race.price}</p>
          </div>
          <div className="absolute top-0 right-[6%] h-[73%] w-[40%] lg:-top-11 lg:right-[4%] lg:h-66 lg:w-1/2"><Medal category={race.category} /></div>
          <div className="absolute inset-x-7 bottom-8.5 flex items-end justify-between gap-2.5 max-xl:inset-x-5 max-xl:bottom-6.25 max-lg:inset-x-[7%] max-lg:bottom-[7%] max-lg:gap-[3cqw]">
            <ul className="text-[17px] leading-[1.4] max-xl:text-[14px] max-lg:text-[4.3cqw] max-lg:leading-[1.85] max-lg:tracking-[-.15cqw]">
              {race.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
            <a href="#tiket" className={`${runButton({ variant: "light", size: "sm" })} max-lg:border-white`}>Beli Tiket<ArrowIcon /></a>
          </div>
        </article>
      ))}
    </div>
  );
}

function RunIntroduction() {
  return (
    <section className="grid grid-cols-[28%_1fr] gap-x-10.5 max-xl:grid-cols-[29%_1fr] max-xl:gap-7 max-lg:grid-cols-1" aria-labelledby="run-intro-heading">
      <div>
        <h2 id="run-intro-heading" className={`${TITLE_FONT} text-[40px] leading-[1.25] tracking-[-1.6px] max-xl:text-[35px] max-lg:text-[clamp(24px,8vw,40px)] max-lg:leading-[1.15] max-lg:tracking-[-1.2px]`}>
          <span className="max-lg:hidden">LARI UNTUK<br />BAHAGIA</span>
          <span className="lg:hidden" lang="en">ENJOY YOUR RUN</span>
        </h2>
        <p className="mt-15.5 text-[19px] leading-[1.75] max-lg:mt-3.5 max-lg:text-[clamp(18px,4.8vw,24px)] max-lg:leading-[1.6]">
          Ayo, lari dan bersenang-senang<br className="max-lg:hidden" /> di <a href="#kategori-lari" className="underline underline-offset-[5px] max-lg:block">#DigilandRun</a>
        </p>
      </div>
      <div className="space-y-7 max-lg:text-[clamp(15px,4vw,19px)] max-lg:leading-[1.8]">
        <p>Bersiaplah untuk Digiland Run, bagian spesial dari Digiland 2025 yang mengajak runner enthusiast, komunitas lari, dan masyarakat untuk berlari dengan penuh semangat dalam pilihan kategori <span className="max-lg:hidden">5K, 10K,</span><span className="lg:hidden">5K (Fun Run), 10K (Easy Run),</span> dan Half Marathon.</p>
        <p>Digelar pada 18 Mei 2025 di Istora Senayan Jakarta, semakin seru dengan penampilan spektakuler dari puluhan musisi ternama, serta pasar rakyat UMKM.</p>
      </div>
    </section>
  );
}

function GoersTickets() {
  return (
    <aside className="relative z-1 mx-auto mt-10 max-w-160 bg-[linear-gradient(130deg,#c4e9e9,#bfe1e3)] p-6 lg:hidden" lang="en" aria-label="Goers tickets">
      <p className="text-[clamp(17px,4.5vw,24px)] leading-[1.65]">Not a Telkomsel user? Get your ticket on Goers and join the fun!<br /><strong className="font-extrabold">#ElevatingYourFuture</strong></p>
      <button type="button" className={`${runButton({ variant: "filled" })} mt-10 w-full disabled:pointer-events-none max-lg:text-[16px]`} disabled>Buy Tickets<ArrowIcon /></button>
    </aside>
  );
}

function Racepack() {
  return (
    <section className="relative isolate min-h-[925px] pt-29 pb-18 max-lg:min-h-0 max-lg:pt-16 max-lg:pb-6" aria-labelledby="racepack-heading">
      <div className="absolute inset-x-0 -top-25 bottom-0 -z-1 opacity-[.045] [mask-image:linear-gradient(transparent,black_15%,black)] max-lg:-inset-x-4 max-lg:-top-65 max-lg:bottom-30" aria-hidden="true">
        <Image src="/content_grid.png" alt="" fill sizes="(max-width: 767px) 100vw, 1152px" className="object-cover" />
      </div>
      <h2 id="racepack-heading" className={`relative z-1 ${TITLE_FONT} text-[40px] leading-[1.25] tracking-[-1.6px] max-xl:text-[35px] max-lg:text-[clamp(25px,8vw,40px)] max-lg:leading-[1.75] max-lg:tracking-[-1px]`}>
        RACEPACK<br />DIGILAND RUN <span className="font-normal">2025</span>
      </h2>
      <div className="mt-16 grid grid-cols-3 gap-12 text-center max-xl:gap-7 max-lg:mt-10 max-lg:grid-cols-1 max-lg:gap-15">
        {[
          ["Nomor BIB", <BibArtwork key="bib" />],
          ["Goodie Bag", <BagArtwork key="bag" />],
          ["Jersey", <JerseyArtwork key="jersey" />],
        ].map(([caption, art]) => (
          <figure key={caption as string}>
            <div className="flex items-center justify-center lg:h-75">{art}</div>
            <figcaption className="mt-5.5 font-archivo text-[23px] font-[750] tracking-[-.6px] max-lg:text-[24px]">{caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-23.5 ml-[34%] text-right max-lg:mt-11 max-lg:ml-0">
        <p className="mb-9 text-[19px] leading-[1.55] max-lg:text-[clamp(15px,4vw,19px)] max-lg:leading-[1.8]">Item-item yang dukung kenyamanan & kelancaran lari, serta medali sesuai kategori untuk kamu yang sampai garis finish.</p>
        <RunDialog kind="racepack" label="Pengambilan Racepack" />
      </div>
    </section>
  );
}

const ESSENTIAL_H3 = "mb-4 font-archivo text-[20px] leading-[1.5] font-[750] tracking-[-.4px] max-xl:text-[18px] max-lg:text-[clamp(22px,6.1vw,30px)] max-lg:leading-[1.3]";
const ESSENTIAL_H4 = "mb-1 text-[16px] leading-[1.5] font-[750] max-lg:mb-0.5 max-lg:text-[clamp(15px,4vw,19px)] max-lg:leading-[1.6]";
const ESSENTIAL_P = "text-[15px] leading-[1.8] max-lg:text-[clamp(15px,4vw,19px)] max-lg:leading-[1.6]";
const FLAG_OFFS = [["Flag Off HM", "05.00 WIB"], ["Flag Off 10K", "05.30 WIB"], ["Flag Off 5K", "05.45 WIB"]];

function EssentialInformation() {
  return (
    <section
      className="bg-[#31a1ab] bg-[url(/bg_content_header.png)] bg-cover bg-center bg-no-repeat pt-29.75 pb-32.5 text-white max-lg:bg-[linear-gradient(180deg,transparent_30%,#e3efd4cc),url(/bg_content_header.png)] max-lg:pt-10 max-lg:pb-20"
      aria-labelledby="run-essentials-heading"
    >
      <div className="wrapper max-lg:max-w-[752px]">
        <div className="grid grid-cols-[29%_21%_21%_21%] justify-between gap-5 max-xl:grid-cols-[25%_22%_24%_22%] max-xl:gap-3.75 max-lg:grid-cols-1 max-lg:gap-7">
          <h2 id="run-essentials-heading" className={`${TITLE_FONT} text-[40px] leading-[1.25] tracking-[-1.6px] max-xl:text-[35px] max-lg:mb-4 max-lg:text-[clamp(27px,8vw,40px)] max-lg:tracking-[-1.1px]`}>
            UNTUK{" "}<br className="max-lg:hidden" />DIKETAHUI
          </h2>
          <div>
            <h3 className={ESSENTIAL_H3}>Masa Pendaftaran</h3>
            <p className={ESSENTIAL_P}>Pendaftaran Digiland Run 2025 akan dibuka mulai:<br /><strong>24 Februari 2025</strong> hingga<br /><strong>7 Mei 2025.</strong></p>
          </div>
          <div>
            <h3 className={ESSENTIAL_H3}>Pengambilan Racepack</h3>
            <p className={ESSENTIAL_P}><strong>Istora Senayan</strong><br />Jl. Pintu Satu Senayan No.1, RT.1/RW.3, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270</p>
            <h4 className={`${ESSENTIAL_H4} mt-7 max-lg:mt-6`}>Tanggal</h4>
            <p className={ESSENTIAL_P}>15 - 17 Mei 2025</p>
            <h4 className={`${ESSENTIAL_H4} mt-7 max-lg:mt-6`}>Jam Operasional</h4>
            <p className={ESSENTIAL_P}>Kamis & Jumat : 11.00 - 20.00 WIB</p>
          </div>
          <div className="max-lg:mt-11">
            <h3 className={ESSENTIAL_H3}>Raceday</h3>
            {FLAG_OFFS.map(([title, time], i) => (
              <div key={title} className={i > 0 ? "mt-6.75 max-lg:mt-7" : ""}>
                <h4 className={ESSENTIAL_H4}>{title}</h4>
                <p className={ESSENTIAL_P}>{time}, Plaza Barat GBK</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-17.5 flex items-center gap-10.5 bg-[#e9f3e9bd] px-10 py-7 text-ink backdrop-blur-md max-xl:gap-6.25 max-xl:p-6 max-lg:mt-16 max-lg:grid max-lg:grid-cols-[38px_minmax(0,1fr)] max-lg:items-start max-lg:gap-x-4 max-lg:gap-y-6 max-lg:px-4 max-lg:pt-5 max-lg:pb-4">
          <span className="flex h-10.5 w-9.25 shrink-0 items-center justify-center bg-brand text-[29px] leading-none font-medium text-white [clip-path:polygon(50%_0,100%_24%,100%_76%,50%_100%,0_76%,0_24%)] max-lg:mt-0.5 max-lg:w-9.5" aria-hidden="true">!</span>
          <p className="flex-1 text-[17px] leading-[1.65] max-lg:text-[clamp(16px,4.5vw,20px)] max-lg:leading-[1.7]"><strong>Racepack Collection</strong> Akan dimulai pada tanggal 15 - 17 Mei 2025<br className="max-lg:hidden" /> di <strong>Istora Senayan</strong>, Jakarta Pusat.</p>
          <RunDialog kind="racepack" label="Info Selengkapnya" filled className="min-w-[265px] max-xl:min-w-[210px] max-lg:col-span-full max-lg:w-full max-lg:min-w-0 max-lg:text-[16px]" />
        </div>
      </div>
    </section>
  );
}

const CAPTION = "absolute flex min-h-25.5 w-70 items-center bg-[url(/community/Vector.png)] bg-size-[100%_100%] bg-center bg-no-repeat p-5 text-[14px] leading-[1.65] text-white max-xl:min-h-21.25 max-xl:w-63.75 max-xl:text-[12px] max-lg:min-h-16.25 max-lg:w-53.75 max-lg:px-4.5 max-lg:py-3.5";
const DOT = "absolute rounded-full bg-[linear-gradient(90deg,#ff9544,#f92685)] shadow-[1px_1px_8px_#a80c5f44]";

const COMMUNITIES = [
  {
    name: "telkomrunners",
    label: "Seperti",
    image: "/community/image(8).png",
    figure: "top-0 -left-[3%] aspect-[652/453] w-[57%] max-lg:w-full",
    dot: "top-8.75 left-20.75 size-8.5 max-lg:top-5 max-lg:left-10 max-lg:size-6",
    caption: "bottom-0 left-5.5 max-lg:bottom-0.5 max-lg:left-0",
  },
  {
    name: "skolari",
    label: "Atau seperti",
    image: "/community/image(9).png",
    figure: "-top-10 -right-[5%] aspect-[633/588] w-[55%] max-lg:mt-2.5 max-lg:w-[94%]",
    dot: "top-17.5 left-8.75 size-6.25 max-lg:top-10 max-lg:left-2.5 max-lg:size-4.5",
    caption: "top-15 left-27.5 max-lg:top-1.25 max-lg:left-17.5",
  },
  {
    name: "runningrage",
    label: "Atau seperti",
    image: "/community/image(10).png",
    figure: "top-[450px] -left-[7%] aspect-[631/419] w-[56%] max-lg:mt-2.5 max-lg:w-full",
    dot: "top-12.5 right-15 size-5.75 max-lg:top-5 max-lg:right-5 max-lg:size-4.5",
    caption: "right-15.5 -bottom-1 max-lg:right-2.5 max-lg:-bottom-1.25",
  },
];

function Communities() {
  return (
    <section
      className="bg-[radial-gradient(ellipse_410px_600px_at_0_21%,#e5d2e5a6,transparent),radial-gradient(ellipse_450px_500px_at_100%_26%,#d7e3e9b3,transparent)] pt-28 pb-27.5 max-md:pt-11.25 max-md:pb-16.25"
      aria-labelledby="run-community-heading"
    >
      <div className={`wrapper ${GUTTER}`}>
        <h2 className={TITLE} id="run-community-heading">KAMU PUNYA KOMUNITAS?</h2>
        <p className="mt-4.5 text-[19px] max-md:mt-3.5 max-md:text-[15px]">Yuk, ajak komunitasmu seru-seruan di <strong className="font-archivo font-[850]">#DIGILAND2025</strong></p>
        {/* lg: overlapping collage; below lg the photos stack */}
        <div className="relative mt-6.25 h-[850px] max-xl:h-[800px] max-lg:mt-5 max-lg:flex max-lg:h-auto max-lg:flex-col">
          {COMMUNITIES.map((community) => (
            <figure className={`group absolute max-lg:relative max-lg:inset-auto max-lg:mx-auto max-lg:max-w-130 max-lg:shrink-0 ${community.figure}`} key={community.name}>
              <div className="absolute inset-0">
                <Image src={community.image} alt={`Suasana kebersamaan komunitas lari ${community.name}`} fill sizes="(max-width: 767px) 90vw, (max-width: 1199px) 55vw, 652px" className="object-contain transition-transform duration-600 group-hover:scale-[1.035] motion-reduce:transition-none" />
              </div>
              <span className={`${DOT} ${community.dot}`} aria-hidden="true" />
              <figcaption className={`${CAPTION} ${community.caption}`}>
                <span>{community.label}<br />komunitas <strong className="font-medium">@{community.name}</strong> ?</span>
              </figcaption>
            </figure>
          ))}
          <div className="absolute top-135 right-0 max-w-111.25 text-right max-xl:top-127.5 max-xl:max-w-87.5 max-lg:static max-lg:mt-12.5 max-lg:max-w-none">
            <p className="mb-10 text-[19px] leading-[1.6] max-lg:mb-6.25 max-lg:text-[16px]">Mau komunitas lari kamu berkolaborasi dengan Digiland?<br />Yuk, daftar sekarang!</p>
            <a href="/community" className={runButton()}>Daftar Komunitas<ArrowIcon /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DigilandRunPage() {
  return (
    <>
      {/* Printing ("Cetak Panduan") keeps only the event information */}
      <main className={`${PAGE} print:[&>:not(#informasi-acara)]:hidden`} id="run-main">
        <RunHero />
        <div className="bg-[radial-gradient(ellipse_530px_370px_at_15%_5%,#e9dce8a6,transparent)] pt-16 pb-21 max-lg:pt-12 max-lg:pb-16">
          <div className="wrapper max-lg:max-w-[752px]">
            <RunIntroduction />
            <RaceCards />
            <GoersTickets />
            <Racepack />
          </div>
        </div>
        <EssentialInformation />
        <EventInformation />
        <Communities />
        <Cta id="tiket" href="https://my.telkomsel.com/" />
        <Sponsors title="Sponsor and Partner" />
      </main>
      <Footer />
    </>
  );
}
