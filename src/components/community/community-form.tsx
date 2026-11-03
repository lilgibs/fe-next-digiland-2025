"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import CommunityOtp from "./community-otp";
import { CONTROL, ERROR, LABEL, LABEL_NOTE } from "@/components/digiland-run/run-ui";

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

const INPUT = `${CONTROL} placeholder:text-[#202c38]`;
const SELECT = `${CONTROL} cursor-pointer appearance-none pr-8`;
const ACTION = "min-h-11.5 px-5 py-3 text-[13px] leading-[20px] font-semibold transition-colors duration-200 max-md:flex-[1_1_140px] motion-reduce:transition-none";
const EDIT = `${ACTION} border border-[#627686] bg-white text-ink hover:bg-[#f1f4f5]`;
const CONFIRM = `${ACTION} border border-[#3eb7ba] bg-[#3eb7ba] text-white hover:bg-[#278f98]`;

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
    <svg className="pointer-events-none absolute top-2.25 right-0 size-5 text-[#627686] max-md:top-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

function FieldError({ name, errors }: { name: FieldName; errors: Errors }) {
  return errors[name] ? <p className={ERROR} id={`${name}-error`}>{errors[name]}</p> : null;
}

function normalizePhone(value: string) {
  return value.replace(/[\s()+-]/g, "").replace(/^0/, "62");
}

export default function CommunityForm() {
  const form = useRef<HTMLFormElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogHeading = useRef<HTMLHeadingElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [otherCity, setOtherCity] = useState(false);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [stage, setStage] = useState<"review" | "otp" | "success">("review");
  const isDialogOpen = submission !== null;

  useEffect(() => {
    if (!submission) return;
    if (!dialog.current?.open) dialog.current?.showModal();
    if (stage === "otp") dialog.current?.querySelector<HTMLInputElement>("#community-otp-code")?.focus();
    else dialogHeading.current?.focus();
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
    <form ref={form} className="mt-15 max-md:mt-9.5" noValidate onSubmit={handleSubmit} onBlur={validateOnBlur} onChange={handleChange} aria-label="Formulir komunitas Digiland Run">
      <div className="grid gap-14.5 max-md:gap-8">
        <div className="min-w-0">
          <label htmlFor="communityName" className={LABEL}>Nama Komunitas</label>
          <input className={INPUT} id="communityName" name="communityName" type="text" required minLength={2} maxLength={100} autoComplete="organization" placeholder="Masukkan Nama Komunitas" aria-invalid={Boolean(errors.communityName)} aria-describedby={errors.communityName ? "communityName-error" : undefined} />
          <FieldError name="communityName" errors={errors} />
        </div>

        <div className="min-w-0">
          <label htmlFor="city" className={LABEL}>Kota Komunitas</label>
          <div className="relative">
            <select className={SELECT} id="city" name="city" required defaultValue="" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "city-error" : undefined}>
              <option value="" disabled>Pilih Kota Komunitas</option>
              {CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
              <option value="other">Kota / Kabupaten Lainnya</option>
            </select>
            <Chevron />
          </div>
          <FieldError name="city" errors={errors} />
          {otherCity && (
            <div className="mt-5.5">
              <label htmlFor="otherCity" className={LABEL}>Nama Kota / Kabupaten</label>
              <input className={INPUT} id="otherCity" name="otherCity" type="text" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="Masukkan Kota atau Kabupaten" aria-invalid={Boolean(errors.otherCity)} aria-describedby={errors.otherCity ? "otherCity-error" : undefined} />
              <FieldError name="otherCity" errors={errors} />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <label htmlFor="leaderName" className={LABEL}>Nama Team Leader</label>
          <input className={INPUT} id="leaderName" name="leaderName" type="text" required minLength={2} maxLength={100} autoComplete="name" placeholder="Masukkan Nama Team Leader" aria-invalid={Boolean(errors.leaderName)} aria-describedby={errors.leaderName ? "leaderName-error" : undefined} />
          <FieldError name="leaderName" errors={errors} />
        </div>

        <div className="min-w-0">
          <label htmlFor="instagram" className={LABEL}>Sosial Media <span className={LABEL_NOTE}>(Instagram)</span></label>
          <input className={INPUT} id="instagram" name="instagram" type="text" required maxLength={31} autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="Masukkan Username Instagram" aria-invalid={Boolean(errors.instagram)} aria-describedby={`instagram-hint${errors.instagram ? " instagram-error" : ""}`} />
          <p className="flex items-center gap-1.25 pt-1.75 pl-3 text-[12px] leading-[17px] text-[#627686]" id="instagram-hint"><svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm.8 10.5H7.2V7h1.6v4.5ZM8 5.7a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" /></svg>Contoh: @Telkomrunners</p>
          <FieldError name="instagram" errors={errors} />
        </div>

        <div className="min-w-0">
          <label htmlFor="memberCount" className={LABEL}>Jumlah Anggota</label>
          <div className="relative">
            <select className={SELECT} id="memberCount" name="memberCount" required defaultValue="" aria-invalid={Boolean(errors.memberCount)} aria-describedby={errors.memberCount ? "memberCount-error" : undefined}>
              <option value="" disabled>Pilih Kisaran Jumlah Anggota</option>
              {MEMBER_RANGES.map((range) => <option key={range} value={range}>{range}</option>)}
            </select>
            <Chevron />
          </div>
          <FieldError name="memberCount" errors={errors} />
        </div>

        <div className="min-w-0">
          <label htmlFor="whatsapp" className={LABEL}>Nomor Handphone <span className={LABEL_NOTE}>(WhatsApp)</span></label>
          <input className={INPUT} id="whatsapp" name="whatsapp" type="tel" required maxLength={22} autoComplete="tel" inputMode="tel" placeholder="Masukkan Nomor WhatsApp" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined} />
          <FieldError name="whatsapp" errors={errors} />
        </div>
      </div>

      <button type="submit" className="mt-16 inline-flex min-h-12 w-66.5 max-w-full items-center justify-center bg-[#3eb7ba] px-5.5 py-3 text-[14px] leading-[24px] font-medium text-white transition-colors duration-200 hover:bg-[#278f98] active:bg-[#187b85] max-md:mt-9.5 max-md:w-full motion-reduce:transition-none">Ajukan Penawaran</button>
    </form>
    <dialog
      ref={dialog}
      className="m-auto max-h-[calc(100dvh-40px)] w-[min(600px,calc(100%-32px))] overflow-auto overscroll-contain border-t-4 border-[#3eb7ba] bg-white p-10 text-ink shadow-[0_24px_100px_#06263340] backdrop:bg-[#082c3ab3] backdrop:backdrop-blur-[5px] max-md:px-5.5 max-md:py-7"
      aria-labelledby="community-submission-heading"
      aria-describedby="community-submission-description community-submission-demo"
      onClose={() => { setSubmission(null); setStage("review"); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled)");
        const first = controls[0];
        const last = controls[controls.length - 1];
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
      <button type="button" className="absolute top-3 right-3 grid size-11 place-items-center text-[#627686] transition-colors duration-200 hover:bg-[#faf1f6] hover:text-brand motion-reduce:transition-none" aria-label="Tutup popup" onClick={() => dialog.current?.close()}>
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
      <span className="block pr-6 text-[11px] font-extrabold tracking-[2px] text-brand">DIGILAND RUN 2025</span>
      <div className={`my-6 grid size-16 place-items-center rounded-full max-md:my-5.5 max-md:size-14 ${stage === "success" ? "bg-[#3eb7ba] text-white" : "bg-[#eaf7f6] text-[#258d95]"}`} aria-hidden="true">
        <svg className="size-8.5" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {stage === "success" ? <path d="m8 16 5 5L24 10" /> : stage === "otp" ? <><rect x="7" y="14" width="18" height="14" rx="2" /><path d="M11 14V9a5 5 0 0 1 10 0v5M16 20v3" /></> : <><path d="M19 5H8v23h17V11l-6-6Z" /><path d="M18 5v7h7M12 18h9m-9 5h6" /></>}
        </svg>
      </div>
      <h2 id="community-submission-heading" ref={dialogHeading} tabIndex={-1} className="font-archivo text-[30px] leading-[1.15] font-[850] tracking-[-1px] outline-none max-md:text-[26px]">
        {stage === "success" ? "PENGAJUAN BERHASIL!" : stage === "otp" ? "VERIFIKASI WHATSAPP" : "KONFIRMASI DATA KOMUNITAS"}
      </h2>
      <p id="community-submission-description" className="mt-4 text-[14px] leading-[1.75] wrap-anywhere">
        {stage === "success" ? <>Terima kasih, <strong>{submission?.communityName}</strong>! Pengajuan penawaran komunitasmu berhasil dibuat dalam simulasi ini.</> : stage === "otp" ? "Masukkan kode OTP untuk memverifikasi nomor WhatsApp team leader dan menyelesaikan pengajuan." : "Pastikan detail komunitasmu sudah benar sebelum mengajukan penawaran."}
      </p>
      {stage === "otp" && submission ? (
        <CommunityOtp phone={normalizePhone(submission.whatsapp)} onVerified={() => setStage("success")} />
      ) : <dl className="mt-6.5 border-t border-[#e0e5e7]">
        {submission && DETAIL_LABELS.map(([key, label]) => (
          <div key={key} className="grid grid-cols-[150px_minmax(0,1fr)] gap-5 border-b border-[#e0e5e7] py-3.25 max-md:grid-cols-[112px_minmax(0,1fr)] max-md:gap-3"><dt className="text-[12px] font-semibold text-[#627686]">{label}</dt><dd className="min-w-0 text-[14px] font-semibold wrap-anywhere max-md:text-[13px]">{submission[key]}{key === "whatsapp" && stage === "success" && <span className="mt-1.5 block text-[11px] font-medium text-[#24715c]">OTP terverifikasi · Simulasi</span>}</dd></div>
        ))}
      </dl>}
      <p className="mt-4.5 text-[12px] leading-[1.6] text-[#627686]" id="community-submission-demo">Mode simulasi. Data tidak dikirim ke server.</p>
      <div className="mt-6.5 flex justify-end gap-3 max-md:flex-wrap">
        {stage === "review" ? (
          <>
            <button type="button" className={EDIT} onClick={() => {
              dialog.current?.close();
              const control = form.current?.elements.namedItem("communityName");
              if (control instanceof HTMLElement) control.focus();
            }}>Ubah Data</button>
            <button type="button" className={CONFIRM} onClick={() => setStage("otp")}>Konfirmasi Pengajuan</button>
          </>
        ) : stage === "otp" ? <button type="button" className={EDIT} onClick={() => {
          dialog.current?.close();
          const control = form.current?.elements.namedItem("whatsapp");
          if (control instanceof HTMLElement) control.focus();
        }}>Ubah Nomor WhatsApp</button> : <button type="button" className={CONFIRM} onClick={() => dialog.current?.close()}>Selesai</button>}
      </div>
    </dialog>
    </>
  );
}
