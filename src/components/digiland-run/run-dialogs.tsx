"use client";

import { useRef } from "react";
import { ArrowIcon } from "./run-button";

export default function RunDialog({ kind, filled = false, label }: {
  kind: "racepack" | "community";
  filled?: boolean;
  label: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const racepack = kind === "racepack";

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className={`run-button ${filled ? "run-button-filled" : ""}`} aria-haspopup="dialog">
        {label}<ArrowIcon />
      </button>
      <dialog ref={dialog} className="run-dialog" aria-label={racepack ? "Informasi pengambilan racepack" : "Kolaborasi komunitas"} onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
        }
      }}>
        <form method="dialog"><button className="run-dialog-close" aria-label="Tutup informasi">×</button></form>
        <span className="run-eyebrow">DIGILAND RUN 2025</span>
        <h2 className="run-title">{racepack ? "AMBIL RACEPACK-MU" : "LARI BARENG, SERU BARENG."}</h2>
        {racepack ? (
          <>
            <p>Siapkan perlengkapanmu sebelum menuju garis start.</p>
            <dl className="run-dialog-facts">
              <div><dt>Lokasi</dt><dd>Istora Senayan, Jakarta Pusat</dd></div>
              <div><dt>Tanggal</dt><dd>15–17 Mei 2025</dd></div>
              <div><dt>Jam operasional</dt><dd>Kamis & Jumat: 11.00–20.00 WIB</dd></div>
            </dl>
            <p>Bawa identitas yang digunakan saat mendaftar dan bukti konfirmasi pendaftaran. Ikuti informasi terbaru melalui akun resmi Digiland.</p>
            <a className="run-button run-button-filled" href="https://www.google.com/maps/search/?api=1&query=Istora+Senayan+Jakarta" target="_blank" rel="noopener noreferrer">Lihat Lokasi<ArrowIcon /></a>
          </>
        ) : (
          <>
            <p>Ajak komunitas larimu jadi bagian dari keseruan #DIGILAND2025. Kenalan dengan komunitas lain, berbagi semangat, dan rayakan setiap langkah bersama.</p>
            <p>Hubungi tim Digiland melalui akun resmi untuk informasi pendaftaran dan kolaborasi komunitas.</p>
            <a className="run-button run-button-filled" href="https://www.instagram.com/digilandid/" target="_blank" rel="noopener noreferrer">Hubungi @digilandid<ArrowIcon /></a>
          </>
        )}
      </dialog>
    </>
  );
}
