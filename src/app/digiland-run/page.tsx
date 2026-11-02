import type { Metadata } from "next";
import Image from "next/image";
import EventInformation from "@/components/digiland-run/event-information";
import { BagArtwork, BibArtwork, JerseyArtwork, Medal } from "@/components/digiland-run/run-artwork";
import RunButton, { ArrowIcon } from "@/components/digiland-run/run-button";
import RunDialog from "@/components/digiland-run/run-dialogs";
import RunHero from "@/components/digiland-run/run-hero";
import Footer from "@/components/footer";
import Cta from "@/components/cta";
import Sponsors from "@/components/sponsors";
import "./run.css";

export const metadata: Metadata = {
  title: "Digiland Run 2025 | Lari untuk Bahagia",
  description: "Lari untuk bahagia di Digiland Run 2025. Temukan kategori 5K, 10K, Half Marathon, informasi racepack, dan panduan acara 18 Mei 2025 di Istora Senayan, Jakarta.",
};

const RACES = [
  { category: "HM", price: "550.000", benefits: ["BIB", "Jersey", "Medal Finisher", "Jersey Finisher"], className: "run-race-hm" },
  { category: "10K", price: "400.000", benefits: ["BIB", "Jersey", "Medal Finisher"], className: "run-race-10k" },
  { category: "5K", price: "350.000", benefits: ["BIB", "Jersey", "Medal Finisher"], className: "run-race-5k" },
] as const;

function RaceCards() {
  return (
    <div className="run-race-cards" id="kategori-lari">
      {RACES.map((race) => (
        <article key={race.category} className={`run-race-card ${race.className}`} aria-label={`Kategori ${race.category}, Rp${race.price}`}>
          <div className="run-race-label"><h3>{race.category}</h3><p>Rp{race.price}</p></div>
          <div className="run-medal"><Medal category={race.category} /></div>
          <div className="run-race-bottom"><ul>{race.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><RunButton href="#tiket" light>Beli Tiket</RunButton></div>
        </article>
      ))}
    </div>
  );
}

function RunIntroduction() {
  return (
    <section className="run-intro" aria-labelledby="run-intro-heading">
      <div>
        <h2 id="run-intro-heading" className="run-title">
          <span className="run-desktop-copy">LARI UNTUK<br />BAHAGIA</span>
          <span className="run-compact-copy" lang="en">ENJOY YOUR RUN</span>
        </h2>
        <p className="run-intro-invitation">Ayo, lari dan bersenang-senang<br /> di <a href="#kategori-lari">#DigilandRun</a></p>
      </div>
      <div className="run-intro-description">
        <p>Bersiaplah untuk Digiland Run, bagian spesial dari Digiland 2025 yang mengajak runner enthusiast, komunitas lari, dan masyarakat untuk berlari dengan penuh semangat dalam pilihan kategori <span className="run-desktop-copy">5K, 10K,</span><span className="run-compact-copy">5K (Fun Run), 10K (Easy Run),</span> dan Half Marathon.</p>
        <p>Digelar pada 18 Mei 2025 di Istora Senayan Jakarta, semakin seru dengan penampilan spektakuler dari puluhan musisi ternama, serta pasar rakyat UMKM.</p>
      </div>
    </section>
  );
}

function GoersTickets() {
  return (
    <aside className="run-goers-tickets" lang="en" aria-label="Goers tickets">
      <p>Not a Telkomsel user? Get your ticket on Goers and join the fun!<br /><strong>#ElevatingYourFuture</strong></p>
      <button type="button" className="run-button run-button-filled" disabled>Buy Tickets<ArrowIcon /></button>
    </aside>
  );
}

function Racepack() {
  return (
    <section className="run-racepack" aria-labelledby="racepack-heading">
      <div className="run-racepack-collage" aria-hidden="true"><Image src="/content_grid.png" alt="" fill sizes="(max-width: 767px) 100vw, 1152px" className="run-collage-image" /></div>
      <h2 id="racepack-heading" className="run-title">RACEPACK<br />DIGILAND RUN <span className="run-light">2025</span></h2>
      <div className="run-pack-grid">
        <figure><div className="run-pack-art"><BibArtwork /></div><figcaption>Nomor BIB</figcaption></figure>
        <figure><div className="run-pack-art"><BagArtwork /></div><figcaption>Goodie Bag</figcaption></figure>
        <figure><div className="run-pack-art"><JerseyArtwork /></div><figcaption>Jersey</figcaption></figure>
      </div>
      <div className="run-racepack-copy"><p>Item-item yang dukung kenyamanan & kelancaran lari, serta medali sesuai kategori untuk kamu yang sampai garis finish.</p><RunDialog kind="racepack" label="Pengambilan Racepack" /></div>
    </section>
  );
}

function EssentialInformation() {
  return (
    <section className="run-essentials" aria-labelledby="run-essentials-heading">
      <div className="wrapper">
        <div className="run-essentials-grid">
          <h2 id="run-essentials-heading" className="run-title">UNTUK{" "}<br />DIKETAHUI</h2>
          <div><h3>Masa Pendaftaran</h3><p>Pendaftaran Digiland Run 2025 akan dibuka mulai:<br /><strong>24 Februari 2025</strong> hingga<br /><strong>7 Mei 2025.</strong></p></div>
          <div><h3>Pengambilan Racepack</h3><p><strong>Istora Senayan</strong><br />Jl. Pintu Satu Senayan No.1, RT.1/RW.3, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270</p><h4>Tanggal</h4><p>15 - 17 Mei 2025</p><h4>Jam Operasional</h4><p>Kamis & Jumat : 11.00 - 20.00 WIB</p></div>
          <div className="run-raceday"><h3>Raceday</h3><div><h4>Flag Off HM</h4><p>05.00 WIB, Plaza Barat GBK</p></div><div><h4>Flag Off 10K</h4><p>05.30 WIB, Plaza Barat GBK</p></div><div><h4>Flag Off 5K</h4><p>05.45 WIB, Plaza Barat GBK</p></div></div>
        </div>
        <div className="run-notice"><span className="run-notice-icon" aria-hidden="true">!</span><p><strong>Racepack Collection</strong> Akan dimulai pada tanggal 15 - 17 Mei 2025<br /> di <strong>Istora Senayan</strong>, Jakarta Pusat.</p><RunDialog kind="racepack" label="Info Selengkapnya" filled /></div>
      </div>
    </section>
  );
}

const COMMUNITIES = [
  { name: "telkomrunners", label: "Seperti", className: "run-community-one", image: "/community/image(8).png" },
  { name: "skolari", label: "Atau seperti", className: "run-community-two", image: "/community/image(9).png" },
  { name: "runningrage", label: "Atau seperti", className: "run-community-three", image: "/community/image(10).png" },
];

function Communities() {
  return (
    <section className="run-communities" aria-labelledby="run-community-heading">
      <div className="wrapper">
        <h2 className="run-title" id="run-community-heading">KAMU PUNYA KOMUNITAS?</h2>
        <p className="run-section-lead">Yuk, ajak komunitasmu seru-seruan di <strong>#DIGILAND2025</strong></p>
        <div className="run-community-collage">
          {COMMUNITIES.map((community) => (
            <figure className={`run-community ${community.className}`} key={community.name}>
              <div className="run-community-photo"><Image src={community.image} alt={`Suasana kebersamaan komunitas lari ${community.name}`} fill sizes="(max-width: 767px) 90vw, (max-width: 1199px) 55vw, 652px" /></div>
              <span className="run-community-dot" aria-hidden="true" />
              <figcaption><span>{community.label}<br />komunitas <strong>@{community.name}</strong> ?</span></figcaption>
              <span className="run-community-sticker" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-1 14H5v-2l4-5 3 4 3-3 4 5v1ZM8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" /></svg></span>
            </figure>
          ))}
          <div className="run-community-cta"><p>Mau komunitas lari kamu berkolaborasi dengan Digiland?<br />Yuk, daftar sekarang!</p><RunButton href="/community">Daftar Komunitas</RunButton></div>
        </div>
      </div>
    </section>
  );
}

export default function DigilandRunPage() {
  return (
    <>
    <main className="run-page" id="run-main">
      <RunHero />
      <div className="run-intro-and-pack">
        <div className="wrapper">
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
