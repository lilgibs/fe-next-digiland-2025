"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const CITIES = [
  "Jakarta", "Bogor", "Depok", "Tangerang", "Tangerang Selatan", "Bekasi",
  "Bandung", "Cirebon", "Semarang", "Surakarta", "Yogyakarta", "Surabaya",
  "Malang", "Denpasar", "Medan", "Palembang", "Pekanbaru", "Padang",
  "Bandar Lampung", "Batam", "Pontianak", "Banjarmasin", "Balikpapan",
  "Samarinda", "Makassar", "Manado", "Mataram", "Kupang", "Ambon", "Jayapura",
];

const MEMBER_RANGES = [
  "1–20 anggota", "21–50 anggota", "51–100 anggota", "101–200 anggota",
  "Lebih dari 200 anggota",
];

type FieldName = "communityName" | "city" | "otherCity" | "leaderName" | "instagram" | "memberCount" | "whatsapp";
type Errors = Partial<Record<FieldName, string>>;
type Submission = Record<Exclude<FieldName, "otherCity">, string>;

const DETAIL_LABELS: [keyof Submission, string][] = [
  ["communityName", "Nama Komunitas"],
  ["city", "Kota Komunitas"],
  ["leaderName", "Team Leader"],
  ["instagram", "Instagram"],
  ["memberCount", "Jumlah Anggota"],
  ["whatsapp", "WhatsApp"],
];

function validateField(name: FieldName, value: string): string | undefined {
  if (!value.trim()) {
    return {
      communityName: "Masukkan nama komunitas.",
      city: "Pilih kota komunitas.",
      otherCity: "Masukkan kota atau kabupaten komunitas.",
      leaderName: "Masukkan nama team leader.",
      instagram: "Masukkan username Instagram komunitas.",
      memberCount: "Pilih kisaran jumlah anggota.",
      whatsapp: "Masukkan nomor WhatsApp yang aktif.",
    }[name];
  }

  if (["communityName", "otherCity", "leaderName"].includes(name) && value.trim().length < 2) {
    return "Masukkan minimal 2 karakter.";
  }
  if (name === "city" && !CITIES.includes(value) && value !== "other") {
    return "Pilih kota dari daftar.";
  }
  if (name === "memberCount" && !MEMBER_RANGES.includes(value)) {
    return "Pilih kisaran jumlah anggota dari daftar.";
  }
  if (name === "instagram") {
    const username = value.trim().replace(/^@/, "");
    if (!/^[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?$/.test(username) || username.includes("..")) {
      return "Masukkan username Instagram yang valid, contoh: @telkomrunners.";
    }
  }
  if (name === "whatsapp") {
    const phone = value.trim().replace(/[\s()-]/g, "");
    if (!/^(?:08|628|\+628)[0-9]{7,11}$/.test(phone)) {
      return "Gunakan nomor WhatsApp Indonesia yang valid, diawali 08 atau +628.";
    }
  }
}

function Chevron() {
  return (
    <svg className="community-select-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

function FieldError({ name, errors }: { name: FieldName; errors: Errors }) {
  return errors[name] ? <p className="community-field-error" id={`${name}-error`}>{errors[name]}</p> : null;
}

export default function CommunityForm() {
  const form = useRef<HTMLFormElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogHeading = useRef<HTMLHeadingElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [otherCity, setOtherCity] = useState(false);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [stage, setStage] = useState<"review" | "success">("review");
  const isDialogOpen = submission !== null;

  useEffect(() => {
    if (!submission) return;
    if (!dialog.current?.open) dialog.current?.showModal();
    dialogHeading.current?.focus();
  }, [submission, stage]);

  useEffect(() => {
    if (!isDialogOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isDialogOpen]);

  function validateOnBlur(event: FormEvent<HTMLFormElement>) {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement)) return;
    const name = control.name as FieldName;
    if (!name) return;
    setErrors((previous) => ({ ...previous, [name]: validateField(name, control.value) }));
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement)) return;
    const name = control.name as FieldName;
    if (name === "city") {
      setOtherCity(control.value === "other");
      setErrors((previous) => ({ ...previous, otherCity: undefined }));
    }
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: validateField(name, control.value) }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const names: FieldName[] = ["communityName", "city", ...(otherCity ? ["otherCity" as const] : []), "leaderName", "instagram", "memberCount", "whatsapp"];
    const nextErrors: Errors = {};
    for (const name of names) {
      const error = validateField(name, String(data.get(name) ?? ""));
      if (error) nextErrors[name] = error;
    }
    setErrors(nextErrors);
    const firstInvalid = names.find((name) => nextErrors[name]);
    if (firstInvalid) {
      const control = form.current?.elements.namedItem(firstInvalid);
      if (control instanceof HTMLElement) control.focus();
      return;
    }
    const value = (name: FieldName) => String(data.get(name) ?? "").trim();
    setStage("review");
    setSubmission({
      communityName: value("communityName"),
      city: value(otherCity ? "otherCity" : "city"),
      leaderName: value("leaderName"),
      instagram: `@${value("instagram").replace(/^@/, "")}`,
      memberCount: value("memberCount"),
      whatsapp: value("whatsapp"),
    });
  }

  return (
    <>
    <form ref={form} className="community-form" noValidate onSubmit={handleSubmit} onBlur={validateOnBlur} onChange={handleChange} aria-label="Formulir komunitas Digiland Run">
      <div className="community-fields">
        <div className="community-field">
          <label htmlFor="communityName">Nama Komunitas</label>
          <input id="communityName" name="communityName" type="text" required minLength={2} maxLength={100} autoComplete="organization" placeholder="Masukan Nama Komunitas Anda" aria-invalid={Boolean(errors.communityName)} aria-describedby={errors.communityName ? "communityName-error" : undefined} />
          <FieldError name="communityName" errors={errors} />
        </div>

        <div className="community-field">
          <label htmlFor="city">Kota Komunitas</label>
          <div className="community-select">
            <select id="city" name="city" required defaultValue="" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "city-error" : undefined}>
              <option value="" disabled>Pilih Kota Komunitas</option>
              {CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
              <option value="other">Kota / Kabupaten Lainnya</option>
            </select>
            <Chevron />
          </div>
          <FieldError name="city" errors={errors} />
          {otherCity && (
            <div className="community-other-city">
              <label htmlFor="otherCity">Nama Kota / Kabupaten</label>
              <input id="otherCity" name="otherCity" type="text" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="Masukan Kota atau Kabupaten Anda" aria-invalid={Boolean(errors.otherCity)} aria-describedby={errors.otherCity ? "otherCity-error" : undefined} />
              <FieldError name="otherCity" errors={errors} />
            </div>
          )}
        </div>

        <div className="community-field">
          <label htmlFor="leaderName">Nama Team Leader</label>
          <input id="leaderName" name="leaderName" type="text" required minLength={2} maxLength={100} autoComplete="name" placeholder="Masukan Nama Team Leader Komunitas Anda" aria-invalid={Boolean(errors.leaderName)} aria-describedby={errors.leaderName ? "leaderName-error" : undefined} />
          <FieldError name="leaderName" errors={errors} />
        </div>

        <div className="community-field">
          <label htmlFor="instagram">Sosial Media <span>(Instagram)</span></label>
          <input id="instagram" name="instagram" type="text" required maxLength={31} autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="Masukan Username Instagram Komunitas Anda" aria-invalid={Boolean(errors.instagram)} aria-describedby={`instagram-hint${errors.instagram ? " instagram-error" : ""}`} />
          <p className="community-field-hint" id="instagram-hint"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm.8 10.5H7.2V7h1.6v4.5ZM8 5.7a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" /></svg>Contoh: @Telkomrunners</p>
          <FieldError name="instagram" errors={errors} />
        </div>

        <div className="community-field">
          <label htmlFor="memberCount">Jumlah Anggota</label>
          <div className="community-select">
            <select id="memberCount" name="memberCount" required defaultValue="" aria-invalid={Boolean(errors.memberCount)} aria-describedby={errors.memberCount ? "memberCount-error" : undefined}>
              <option value="" disabled>Pilih Kisaran Jumlah Anggota</option>
              {MEMBER_RANGES.map((range) => <option key={range} value={range}>{range}</option>)}
            </select>
            <Chevron />
          </div>
          <FieldError name="memberCount" errors={errors} />
        </div>

        <div className="community-field">
          <label htmlFor="whatsapp">Nomor Handphone <span>(WhatsApp)</span></label>
          <input id="whatsapp" name="whatsapp" type="tel" required maxLength={22} autoComplete="tel" inputMode="tel" placeholder="Masukan Nomor Handphone WhatsApp Anda" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined} />
          <FieldError name="whatsapp" errors={errors} />
        </div>
      </div>

      <button type="submit" className="community-submit">Ajukan Penawaran</button>
    </form>
    <dialog
      ref={dialog}
      className="community-submission-dialog"
      aria-labelledby="community-submission-heading"
      aria-describedby="community-submission-description community-submission-demo"
      onClose={() => { setSubmission(null); setStage("review"); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogHeading.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
      }}
    >
      <button type="button" className="community-dialog-close" aria-label="Tutup popup" onClick={() => dialog.current?.close()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
      <span className="community-dialog-eyebrow">DIGILAND RUN 2025</span>
      <div className={`community-dialog-icon ${stage === "success" ? "is-success" : ""}`} aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {stage === "success" ? <path d="m8 16 5 5L24 10" /> : <><path d="M19 5H8v23h17V11l-6-6Z" /><path d="M18 5v7h7M12 18h9m-9 5h6" /></>}
        </svg>
      </div>
      <h2 id="community-submission-heading" ref={dialogHeading} tabIndex={-1}>
        {stage === "success" ? "PENGAJUAN BERHASIL!" : "KONFIRMASI DATA KOMUNITAS"}
      </h2>
      <p id="community-submission-description" className="community-dialog-description">
        {stage === "success" ? <>Terima kasih, <strong>{submission?.communityName}</strong>! Pengajuan penawaran komunitasmu berhasil dibuat dalam simulasi ini.</> : "Pastikan detail komunitasmu sudah benar sebelum mengajukan penawaran."}
      </p>
      <dl className="community-submission-details">
        {submission && DETAIL_LABELS.map(([key, label]) => (
          <div key={key}><dt>{label}</dt><dd>{submission[key]}</dd></div>
        ))}
      </dl>
      <p className="community-dialog-demo" id="community-submission-demo">Mode simulasi. Data tidak dikirim ke server.</p>
      <div className="community-dialog-actions">
        {stage === "review" ? (
          <>
            <button type="button" className="community-dialog-edit" onClick={() => {
              dialog.current?.close();
              const control = form.current?.elements.namedItem("communityName");
              if (control instanceof HTMLElement) control.focus();
            }}>Ubah Data</button>
            <button type="button" className="community-dialog-confirm" onClick={() => setStage("success")}>Konfirmasi Pengajuan</button>
          </>
        ) : <button type="button" className="community-dialog-confirm" onClick={() => dialog.current?.close()}>Selesai</button>}
      </div>
    </dialog>
    </>
  );
}
