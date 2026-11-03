"use client";

import { useRef } from "react";
import { ArrowIcon, EYEBROW, TITLE_FONT, runButton } from "./run-ui";

export default function RunDialog({ kind, filled = false, label, className = "" }: {
  kind: "racepack" | "community";
  filled?: boolean;
  label: string;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const racepack = kind === "racepack";

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className={`${runButton({ variant: filled ? "filled" : "outline" })} ${className}`} aria-haspopup="dialog">
        {label}<ArrowIcon />
      </button>
      <dialog
        ref={dialog}
        className="m-auto max-h-[calc(100dvh-48px)] w-[min(580px,calc(100%-32px))] bg-white px-10.5 text-left pt-13.75 pb-10.5 text-ink shadow-[0_25px_100px_#0004] backdrop:bg-[#082b39a6] backdrop:backdrop-blur-[6px] max-md:px-6.5 max-md:pt-12.5 max-md:pb-7.5 [&_p]:mt-6"
        aria-label={racepack ? "Informasi pengambilan racepack" : "Kolaborasi komunitas"}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
          }
        }}
      >
        <form method="dialog"><button className="absolute top-2.5 right-4 size-9.5 text-[30px] leading-none" aria-label="Tutup informasi">×</button></form>
        <span className={`${EYEBROW} mb-5`}>DIGILAND RUN 2025</span>
        <h2 className={`${TITLE_FONT} text-[32px] leading-[1.25] tracking-[-1.6px] max-md:text-[28px] max-md:leading-[1.22] max-md:tracking-[-1px]`}>
          {racepack ? "AMBIL RACEPACK-MU" : "LARI BARENG, SERU BARENG."}
        </h2>
        {racepack ? (
          <>
            <p>Siapkan perlengkapanmu sebelum menuju garis start.</p>
            <dl className="mt-6 border-t border-[#dedede]">
              {[
                ["Lokasi", "Istora Senayan, Jakarta Pusat"],
                ["Tanggal", "15–17 Mei 2025"],
                ["Jam operasional", "Kamis & Jumat: 11.00–20.00 WIB"],
              ].map(([term, value]) => (
                <div key={term} className="grid grid-cols-[38%_1fr] gap-4 border-b border-[#dedede] py-3.5 text-[14px]">
                  <dt className="font-extrabold">{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p>Bawa identitas yang digunakan saat mendaftar dan bukti konfirmasi pendaftaran. Ikuti informasi terbaru melalui akun resmi Digiland.</p>
            <a className={`${runButton({ variant: "filled" })} mt-7.5`} href="https://www.google.com/maps/search/?api=1&query=Istora+Senayan+Jakarta" target="_blank" rel="noopener noreferrer">Lihat Lokasi<ArrowIcon /></a>
          </>
        ) : (
          <>
            <p>Ajak komunitas larimu jadi bagian dari keseruan #DIGILAND2025. Kenalan dengan komunitas lain, berbagi semangat, dan rayakan setiap langkah bersama.</p>
            <p>Hubungi tim Digiland melalui akun resmi untuk informasi pendaftaran dan kolaborasi komunitas.</p>
            <a className={`${runButton({ variant: "filled" })} mt-7.5`} href="https://www.instagram.com/digilandid/" target="_blank" rel="noopener noreferrer">Hubungi @digilandid<ArrowIcon /></a>
          </>
        )}
      </dialog>
    </>
  );
}
