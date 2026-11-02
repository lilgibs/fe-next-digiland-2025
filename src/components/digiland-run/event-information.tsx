"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowIcon } from "./run-button";

const TABS = ["Syarat & Ketentuan", "FAQ", "Hadiah Lomba", "Rute Lari", "Race Guide"];
const CATEGORIES = [
  { name: "5K", distance: "5 kilometer", age: "13", time: "05.45 WIB" },
  { name: "10K", distance: "10 kilometer", age: "17", time: "05.30 WIB" },
  { name: "21K atau Half Marathon (HM)", distance: "21 kilometer", age: "17", time: "05.00 WIB" },
];

function InfoRow({ title, children, more, initiallyOpen = false }: {
  title: string;
  children: ReactNode;
  more?: ReactNode;
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const id = `run-info-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  return (
    <div className="run-info-row">
      <h3>{title}</h3>
      <div className="run-info-row-body">
        {children}
        {more && (
          <>
            <div id={id} hidden={!open} className="run-info-more">{more}</div>
            <button type="button" className="run-text-button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
              {open ? "Lebih Sedikit" : "Baca Lebih Lengkap"}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={open ? "is-open" : ""}><path d="m3 6 5 5 5-5" /></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CategoryText({ category }: { category: typeof CATEGORIES[number] }) {
  return (
    <div className="run-category-terms">
      <h4>{category.name}</h4>
      <p>Lomba lari jalan raya berjarak {category.distance}, dengan peserta adalah warga negara Indonesia dan warga negara asing yang memiliki KITAS, putra dan putri dengan batasan usia {category.age} tahun sampai dengan 80 tahun. Dalam kategori ini yang berhak untuk menjadi pemenang adalah warga negara Indonesia (dibuktikan dengan memiliki KTP / Kartu Pelajar asli Indonesia yang didaftarkan pada saat melakukan pendaftaran lomba) dan dibuktikan dengan menunjukkan dokumen asli (bukan foto copy / digital file) pada saat dilakukan verifikasi pemenang.</p>
    </div>
  );
}

function Terms() {
  const [allTerms, setAllTerms] = useState(false);

  return (
    <>
      <InfoRow title="Ketentuan Pendaftaran" more={<p>Peserta wajib mengisi data pendaftaran sesuai identitas asli dan memilih kategori sesuai batas usia. Konfirmasi pendaftaran digunakan pada saat pengambilan racepack.</p>}>
        <ol>
          <li>Memiliki identitas yang berlaku di Negara Republik Indonesia (Kartu Pelajar/ KTP/KITAS)</li>
          <li>Merupakan Warga Negara Indonesia (WNI) dan warga negara Asing yang memiliki KITAS</li>
          <li>Sudah cukup umur pada saat mendaftar.</li>
        </ol>
      </InfoRow>
      <InfoRow title="Peserta">
        <p>Warga Negara Indonesia dan Warga Negara Asing yang memiliki KITAS, putra dan putri berusia 13 tahun ke atas, sehat jasmani dan rohani, dengan mencantumkan nomor identitas kependudukan (Kartu Pelajar atau KTP/KITAS).</p>
      </InfoRow>
      <InfoRow title="Tempat Kegiatan dan Rute">
        <p>Tempat acara : Plaza Barat, Gelora Bung Karno Jakarta<br />Rute Lari &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Plaza Barat, Gelora Bung Karno Jakarta (detail rute lari akan diinformasikan kemudian)</p>
      </InfoRow>
      <InfoRow title="Kategori Lari" initiallyOpen more={<>{CATEGORIES.slice(1).map((category) => <CategoryText key={category.name} category={category} />)}</>}>
        <CategoryText category={CATEGORIES[0]} />
      </InfoRow>
      <InfoRow title="Perlengkapan Lomba" more={<p>Peserta juga mendapatkan goodie bag. Medali finisher diberikan kepada peserta yang menyelesaikan perlombaan sesuai kategori yang diikuti.</p>}>
        <ol><li>Jersey DIGILAND RUN 2025</li><li>Bib dan timing chip</li><li>Refreshment (air mineral, isotonik dan buah)</li></ol>
      </InfoRow>
      <InfoRow title="Penentuan Pemenang" more={<p>Peserta wajib menggunakan nomor BIB yang terdaftar atas namanya dan menunjukkan dokumen identitas asli pada saat verifikasi pemenang.</p>}>
        <ol><li>Peserta yang berhak memenangkan perlombaan adalah Warga Negara Indonesia dan Warga Negara Asing Pemegang KITAS, yang dibuktikan dengan identitas yang diterbitkan oleh Pemerintah Indonesia (KITAS/KTP dan Kartu Pelajar).</li></ol>
      </InfoRow>
      <InfoRow title="Layanan" more={<p>Peserta dapat menghubungi petugas di area lomba apabila membutuhkan bantuan. Air mineral, minuman isotonik, dan buah disediakan sebagai refreshment peserta.</p>}>
        <h4>1. Layanan Medis</h4>
        <p className="run-indent">Panitia penyelenggara menyiapkan beberapa pelayanan medis terdiri dari dokter dan staf perawat untuk pertolongan pertama, dilengkapi dengan fasilitas ambulance dan peralatan medis.</p>
      </InfoRow>
      <InfoRow title="Informasi Pengambilan Racepack">
        <p>Istora Senayan, Jakarta Pusat.<br />15–17 Mei 2025. Bawa identitas dan bukti konfirmasi pendaftaran.</p>
      </InfoRow>
      <div id="run-additional-terms" hidden={!allTerms}>
        <InfoRow title="Nomor BIB"><p>Kenakan nomor BIB sesuai data pendaftaran selama mengikuti perlombaan agar petugas dapat mengidentifikasi peserta dan kategori lari.</p></InfoRow>
        <InfoRow title="Informasi Penyelenggara"><p>Ikuti pengumuman dan pembaruan informasi acara melalui akun resmi <a href="https://www.instagram.com/digilandid/" target="_blank" rel="noopener noreferrer">@digilandid</a>.</p></InfoRow>
      </div>
      <div className="run-load-more">
        <button type="button" className="run-button" aria-expanded={allTerms} aria-controls="run-additional-terms" onClick={() => setAllTerms(!allTerms)}>
          {allTerms ? "Tampilkan Lebih Sedikit" : "Muat Lebih banyak Syarat & Ketentuan"}<ArrowIcon down={!allTerms} />
        </button>
      </div>
    </>
  );
}

const FAQS = [
  { q: "Kapan dan di mana Digiland Run 2025 diadakan?", a: "Digiland Run 2025 diadakan pada Minggu, 18 Mei 2025 di kawasan Istora Senayan, Gelora Bung Karno, Jakarta." },
  { q: "Apa saja kategori lari yang tersedia?", a: "Tersedia tiga kategori: 5K, 10K, dan Half Marathon (21K). Pilih kategori sesuai usia, kemampuan, dan persiapan larimu." },
  { q: "Apa saja yang termasuk dalam racepack?", a: "Peserta mendapatkan nomor BIB, jersey, dan goodie bag. Medali finisher diberikan setelah menyelesaikan perlombaan. Peserta Half Marathon juga mendapatkan jersey finisher." },
  { q: "Kapan racepack dapat diambil?", a: "Pengambilan racepack berlangsung pada 15–17 Mei 2025 di Istora Senayan, Jakarta Pusat. Jam operasional Kamis dan Jumat adalah pukul 11.00–20.00 WIB." },
  { q: "Apa yang perlu dibawa saat mengambil racepack?", a: "Siapkan identitas asli yang digunakan saat pendaftaran dan bukti konfirmasi pendaftaran. Pantau akun resmi @digilandid untuk informasi terbaru." },
  { q: "Di mana saya bisa mendapatkan tiket?", a: "Tiket Digiland tersedia melalui MyTelkomsel. Gunakan tombol Beli Tiket untuk menuju bagian informasi tiket." },
];

export default function EventInformation() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <section id="informasi-acara" className="run-information" aria-labelledby="run-information-heading">
      <div className="wrapper">
        <h2 id="run-information-heading" className="run-title">INFORMASI ACARA</h2>
        <div className="run-tabs" role="tablist" aria-label="Informasi Digiland Run">
          {TABS.map((tab, index) => (
            <button key={tab} type="button" role="tab" id={`run-tab-${index}`} aria-selected={active === index} aria-controls={`run-panel-${index}`} tabIndex={active === index ? 0 : -1} ref={(element) => { buttons.current[index] = element; }} onClick={() => setActive(index)} onKeyDown={(event) => handleKey(event, index)}>
              {tab}
            </button>
          ))}
        </div>
        {TABS.map((tab, index) => (
          <div key={tab} role="tabpanel" id={`run-panel-${index}`} aria-labelledby={`run-tab-${index}`} hidden={active !== index} tabIndex={0} className="run-tab-panel">
            {index === 0 && <Terms />}
            {index === 1 && <div className="run-faq-list">{FAQS.map(({ q, a }) => <details key={q} className="run-faq"><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>}
            {index === 2 && <div className="run-tab-intro"><span className="run-eyebrow">EVERY FINISH IS A WIN</span><h3 className="run-title">RAYAKAN PENCAPAIANMU.</h3><p>Medali finisher menantimu di garis akhir untuk setiap kategori: 5K, 10K, dan Half Marathon.</p><p>Informasi hadiah dan ketentuan pemenang akan diumumkan melalui kanal resmi Digiland.</p><a className="run-button" href="https://www.instagram.com/digilandid/" target="_blank" rel="noopener noreferrer">Ikuti Informasi Terbaru<ArrowIcon /></a></div>}
            {index === 3 && <div className="run-route-panel"><p className="run-panel-lead">Mulai langkahmu dari Plaza Barat, Gelora Bung Karno, Jakarta.</p><div className="run-route-grid">{CATEGORIES.map((category) => <article key={category.name}><span className="run-eyebrow">FLAG OFF</span><h3>{category.name === "21K atau Half Marathon (HM)" ? "HM" : category.name}</h3><p>{category.time}</p><span>Plaza Barat GBK</span></article>)}</div><p>Detail rute lari akan diinformasikan kemudian melalui kanal resmi Digiland.</p><a className="run-button" href="https://www.google.com/maps/search/?api=1&query=Plaza+Barat+GBK+Jakarta" target="_blank" rel="noopener noreferrer">Lihat Area Start<ArrowIcon /></a></div>}
            {index === 4 && <div className="run-guide"><span className="run-eyebrow">YOUR START-LINE CHECKLIST</span><h3 className="run-title">SIAP UNTUK HARI LARI?</h3><ol><li><strong>Ambil racepack.</strong><span>15–17 Mei 2025 di Istora Senayan. Siapkan identitas dan konfirmasi pendaftaran.</span></li><li><strong>Siapkan perlengkapan.</strong><span>Jersey, nomor BIB, sepatu lari, dan perlengkapan pribadimu.</span></li><li><strong>Kenali waktu start.</strong><span>HM 05.00 WIB · 10K 05.30 WIB · 5K 05.45 WIB, Plaza Barat GBK.</span></li><li><strong>Nikmati setiap langkah.</strong><span>Ikuti arahan petugas dan hubungi tim medis apabila membutuhkan bantuan.</span></li></ol><button type="button" className="run-button" onClick={() => window.print()}>Cetak Panduan<ArrowIcon /></button></div>}
          </div>
        ))}
      </div>
    </section>
  );
}
