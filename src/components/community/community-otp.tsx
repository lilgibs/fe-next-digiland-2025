"use client";

import { useEffect, useRef, useState } from "react";
import { CONTROL, ERROR, LABEL, LABEL_NOTE } from "@/components/digiland-run/run-ui";

// Frontend demonstration only. Replace with server-issued challenges and verification.
const DEMO_OTP_CODE = "123456";
const RESEND_SECONDS = 30;
const EXPIRY_SECONDS = 300;

export default function CommunityOtp({ phone, onVerified }: {
  phone: string;
  onVerified: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [requestedAt, setRequestedAt] = useState(() => Date.now());
  const [now, setNow] = useState(requestedAt);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const elapsed = Math.floor((now - requestedAt) / 1000);
  const resendIn = Math.max(0, RESEND_SECONDS - elapsed);
  const expiresIn = Math.max(0, EXPIRY_SECONDS - elapsed);
  const expired = expiresIn === 0;

  useEffect(() => {
    input.current?.focus();
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [requestedAt]);

  function requestCode() {
    if (Date.now() - requestedAt < RESEND_SECONDS * 1000) return;
    const timestamp = Date.now();
    setRequestedAt(timestamp);
    setNow(timestamp);
    setCode("");
    setError("");
  }

  function verifyCode() {
    if (Date.now() - requestedAt >= EXPIRY_SECONDS * 1000) {
      setNow(Date.now());
      setError("Kode OTP sudah kedaluwarsa. Minta kode baru.");
    } else if (code.length !== 6) {
      setError("Masukkan 6 digit kode OTP.");
      input.current?.focus();
    } else if (code !== DEMO_OTP_CODE) {
      setError("Kode OTP belum sesuai. Periksa kembali kode simulasi.");
      input.current?.focus();
    } else {
      setError("");
      onVerified();
    }
  }

  return (
    <div className="mt-6 min-w-0 border border-[#cde7e7] bg-[#f5fbfb] p-5.5 max-md:p-4.5">
      <label htmlFor="community-otp-code" className={LABEL}>Kode OTP <span className={LABEL_NOTE}>(Verifikasi WhatsApp)</span></label>
      <p className="mt-2 text-[13px] leading-[1.7] wrap-anywhere">Nomor WhatsApp <strong>+{phone}</strong></p>
      <div className="mt-4 flex items-center gap-5 max-md:flex-wrap max-md:gap-3.5">
        <input
          ref={input}
          className={`${CONTROL} min-w-0 flex-1 tracking-[8px] tabular-nums placeholder:text-[14px] placeholder:tracking-normal placeholder:text-[#627686] disabled:border-[#adbec5] disabled:text-[#627686] disabled:opacity-100 max-md:basis-full`}
          id="community-otp-code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="6 digit kode OTP"
          value={code}
          disabled={expired}
          aria-invalid={Boolean(error)}
          aria-describedby={`community-otp-demo community-otp-status${error ? " community-otp-error" : ""}`}
          onChange={(event) => { setCode(event.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
          onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); verifyCode(); } }}
        />
        <button type="button" className="min-h-11 shrink-0 bg-[#3eb7ba] px-4.5 py-2.5 text-[13px] leading-[24px] font-semibold text-white enabled:hover:bg-[#278f98] disabled:bg-[#d9e5e6] disabled:text-[#51666e] max-md:w-full" disabled={expired} onClick={verifyCode}>
          Verifikasi OTP
        </button>
      </div>
      {error && <p className={ERROR} id="community-otp-error" role="alert">{error}</p>}
      <p id="community-otp-demo" className="mt-3 text-[12px] leading-[1.7] text-[#627686]">
        Simulasi: gunakan kode <strong className="tracking-[1px] text-[#25313c] tabular-nums">{DEMO_OTP_CODE}</strong>. Tidak ada pesan WhatsApp yang dikirim.
      </p>
      <p id="community-otp-status" className="mt-2 text-[12px] leading-[1.7] empty:hidden" role="status">
        {expired ? "Kode kedaluwarsa. Minta kode baru." : "Kode simulasi siap digunakan, berlaku selama 5 menit."}
      </p>
      <button type="button" className="mt-3 min-h-9 text-[12px] font-semibold text-[#187b85] underline underline-offset-4 disabled:text-[#627686] disabled:no-underline" disabled={resendIn > 0} onClick={requestCode}>
        {resendIn > 0 ? `Kirim ulang dalam ${resendIn} detik` : "Kirim ulang OTP"}
      </button>
    </div>
  );
}
