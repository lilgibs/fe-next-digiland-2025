"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowIcon, EYEBROW, GUTTER, TITLE, runButton } from "./run-ui";

const TABS = ["Syarat & Ketentuan", "FAQ", "Hadiah Lomba", "Rute Lari", "Race Guide"];
const CATEGORIES = [
  { name: "5K", distance: "5 kilometer", age: "13", time: "05.45 WIB" },
  { name: "10K", distance: "10 kilometer", age: "17", time: "05.30 WIB" },
  { name: "21K atau Half Marathon (HM)", distance: "21 kilometer", age: "17", time: "05.00 WIB" },
];

function InfoRow({ title, children, more, initiallyOpen = false, toggleClassName = "mt-4 max-md:mt-3.5" }: {
  title: string;
  children: ReactNode;
  more?: ReactNode;
  initiallyOpen?: boolean;
  toggleClassName?: string;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const id = `run-info-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  return (
    <div className="grid grid-cols-[28%_minmax(0,1fr)] gap-10.5 border-b border-[#dedede] py-5.25 text-[15px] leading-[1.6] first:pt-2.5 first:pb-7.5 max-xl:grid-cols-[29%_1fr] max-xl:gap-7 max-md:grid-cols-1 max-md:gap-3 max-md:py-5.5 max-md:text-[13px] max-md:first:pb-6.25 [&_h4]:font-extrabold [&_ol]:list-decimal [&_ol]:pl-6">
      <h3 className="font-archivo text-[19px] leading-[1.5] font-[750] tracking-[-.5px] max-md:text-[17px]">{title}</h3>
      <div>
        {children}
        {more && (
          <>
            <div id={id} hidden={!open} className="mt-6 max-md:mt-5">{more}</div>
            <button
              type="button"
              className={`inline-flex items-center gap-3 px-2 py-0.75 text-[14px] text-[#b93888] hover:text-[#781447] hover:underline hover:underline-offset-4 max-md:pl-0 max-md:text-[12px] ${toggleClassName}`}
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen(!open)}
            >
              {open ? "Lebih Sedikit" : "Baca Lebih Lengkap"}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={`size-4.5 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}><path d="m3 6 5 5 5-5" /></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CategoryText({ category, className = "" }: { category: typeof CATEGORIES[number]; className?: string }) {
  return (
    <div className={className}>
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
      <InfoRow
        title="Kategori Lari"
        initiallyOpen
        toggleClassName="mt-8"
        more={<>{CATEGORIES.slice(1).map((category, i) => <CategoryText key={category.name} category={category} className={i > 0 ? "mt-7" : ""} />)}</>}
      >
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
        <p className="pl-6">Panitia penyelenggara menyiapkan beberapa pelayanan medis terdiri dari dokter dan staf perawat untuk pertolongan pertama, dilengkapi dengan fasilitas ambulance dan peralatan medis.</p>
      </InfoRow>
      <InfoRow title="Informasi Pengambilan Racepack">
        <p>Istora Senayan, Jakarta Pusat.<br />15–17 Mei 2025. Bawa identitas dan bukti konfirmasi pendaftaran.</p>
      </InfoRow>
      <div id="run-additional-terms" hidden={!allTerms}>
        <InfoRow title="Nomor BIB"><p>Kenakan nomor BIB sesuai data pendaftaran selama mengikuti perlombaan agar petugas dapat mengidentifikasi peserta dan kategori lari.</p></InfoRow>
        <InfoRow title="Informasi Penyelenggara"><p>Ikuti pengumuman dan pembaruan informasi acara melalui akun resmi <a className="text-brand underline underline-offset-3" href="https://www.instagram.com/digilandid/" target="_blank" rel="noopener noreferrer">@digilandid</a>.</p></InfoRow>
      </div>
      <div className="mt-16.25 text-center max-md:mt-8.75">
        <button type="button" className={`${runButton()} max-md:text-[12px]`} aria-expanded={allTerms} aria-controls="run-additional-terms" onClick={() => setAllTerms(!allTerms)}>
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

const PANEL = "max-w-212.5 pt-5 pb-15";

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
    <section
      id="informasi-acara"
      className="bg-[radial-gradient(ellipse_380px_250px_at_9%_100%,#eadde9a1,transparent)] pt-37.5 pb-22.5 max-md:pt-16.25 max-md:pb-13.75 print:bg-none print:p-0"
      aria-labelledby="run-information-heading"
    >
      <div className={`wrapper ${GUTTER}`}>
        <h2 id="run-information-heading" className={TITLE}>INFORMASI ACARA</h2>
        <div
          className="mt-21 mb-15 grid grid-cols-[1.45fr_.8fr_1.2fr_.95fr_1.35fr] gap-3 max-md:-mx-0.75 max-md:mt-8.75 max-md:mb-7 max-md:flex max-md:gap-2 max-md:overflow-x-auto max-md:px-0.75 max-md:pt-0.75 max-md:pb-3 max-md:[scrollbar-color:#b62373_#f3edf0] max-md:[scrollbar-width:thin] print:hidden"
          role="tablist"
          aria-label="Informasi Digiland Run"
        >
          {TABS.map((tab, index) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`run-tab-${index}`}
              aria-selected={active === index}
              aria-controls={`run-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              ref={(element) => { buttons.current[index] = element; }}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKey(event, index)}
              className="min-h-16 border border-[#707070] bg-white px-4 py-3 text-[14px] leading-[1.4] transition-colors duration-150 hover:bg-[#fcf6fa] hover:text-brand aria-selected:border-3 aria-selected:border-[#c1257b] aria-selected:font-extrabold aria-selected:text-[#ba2878] max-md:min-h-12.5 max-md:shrink-0 max-md:text-[12px] motion-reduce:transition-none"
            >
              {tab}
            </button>
          ))}
        </div>
        {TABS.map((tab, index) => (
          <div key={tab} role="tabpanel" id={`run-panel-${index}`} aria-labelledby={`run-tab-${index}`} hidden={active !== index} tabIndex={0} className="min-h-107.5 outline-offset-10 print:min-h-0 print:pt-6.25">
            {index === 0 && <Terms />}
            {index === 1 && (
              <div>
                {FAQS.map(({ q, a }) => (
                  <details key={q} className="group border-b border-[#dedede] py-6.25">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[19px] font-bold max-md:text-[16px] [&::-webkit-details-marker]:hidden">
                      {q}
                      <span aria-hidden="true" className="text-[30px] font-normal text-brand transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">+</span>
                    </summary>
                    <p className="mt-5 max-w-212.5">{a}</p>
                  </details>
                ))}
              </div>
            )}
            {index === 2 && (
              <div className={PANEL}>
                <span className={`${EYEBROW} mb-5`}>EVERY FINISH IS A WIN</span>
                <h3 className={TITLE}>RAYAKAN PENCAPAIANMU.</h3>
                <p className="mt-6">Medali finisher menantimu di garis akhir untuk setiap kategori: 5K, 10K, dan Half Marathon.</p>
                <p className="mt-6">Informasi hadiah dan ketentuan pemenang akan diumumkan melalui kanal resmi Digiland.</p>
                <a className={`${runButton()} mt-7.5`} href="https://www.instagram.com/digilandid/" target="_blank" rel="noopener noreferrer">Ikuti Informasi Terbaru<ArrowIcon /></a>
              </div>
            )}
            {index === 3 && (
              <div>
                <p className="text-[20px] max-md:text-[17px]">Mulai langkahmu dari Plaza Barat, Gelora Bung Karno, Jakarta.</p>
                <div className="my-9 grid grid-cols-[repeat(3,1fr)] gap-6 max-md:gap-2.5">
                  {CATEGORIES.map((category) => (
                    <article key={category.name} className="border-t-3 border-[#2698a3] bg-[#e9f5f3] p-7.5 max-md:px-3 max-md:py-5">
                      <span className={`${EYEBROW} mb-2.5 max-md:text-[9px] max-md:tracking-[1px]`}>FLAG OFF</span>
                      <h3 className="font-archivo text-[48px] font-[850] max-md:text-[36px]">{category.name === "21K atau Half Marathon (HM)" ? "HM" : category.name}</h3>
                      <p className="text-[22px] font-bold max-md:text-[15px]">{category.time}</p>
                      <span className="text-[14px] max-md:text-[11px]">Plaza Barat GBK</span>
                    </article>
                  ))}
                </div>
                <p>Detail rute lari akan diinformasikan kemudian melalui kanal resmi Digiland.</p>
                <a className={`${runButton()} mt-6.25`} href="https://www.google.com/maps/search/?api=1&query=Plaza+Barat+GBK+Jakarta" target="_blank" rel="noopener noreferrer">Lihat Area Start<ArrowIcon /></a>
              </div>
            )}
            {index === 4 && (
              <div className={PANEL}>
                <span className={`${EYEBROW} mb-5`}>YOUR START-LINE CHECKLIST</span>
                <h3 className={TITLE}>SIAP UNTUK HARI LARI?</h3>
                <ol className="mt-9 list-decimal pl-6 [&_li]:mb-6 [&_li]:pl-2 [&_span]:block [&_strong]:block">
                  <li><strong>Ambil racepack.</strong><span>15–17 Mei 2025 di Istora Senayan. Siapkan identitas dan konfirmasi pendaftaran.</span></li>
                  <li><strong>Siapkan perlengkapan.</strong><span>Jersey, nomor BIB, sepatu lari, dan perlengkapan pribadimu.</span></li>
                  <li><strong>Kenali waktu start.</strong><span>HM 05.00 WIB · 10K 05.30 WIB · 5K 05.45 WIB, Plaza Barat GBK.</span></li>
                  <li><strong>Nikmati setiap langkah.</strong><span>Ikuti arahan petugas dan hubungi tim medis apabila membutuhkan bantuan.</span></li>
                </ol>
                <button type="button" className={runButton()} onClick={() => window.print()}>Cetak Panduan<ArrowIcon /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
