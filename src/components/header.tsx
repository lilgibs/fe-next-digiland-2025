"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ArrowUpRight } from "@/components/arrow-link";
import { TICKET_URL } from "@/lib/site";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/digiland-run", label: "Digiland Run" },
  { href: "/community", label: "Komunitas" },
];

function Actions() {
  return (
    <>
      <a
        href={TICKET_URL}
        className="inline-flex h-9.5 items-center gap-3 bg-brand px-5 text-[15px] font-medium text-white transition-colors hover:bg-brand/85"
      >
        Beli Tiket
        <ArrowUpRight />
      </a>
      {/* ponytail: visual only until i18n is decided */}
      <button
        type="button"
        aria-label="Bahasa: Indonesia"
        className="inline-flex h-9.5 items-center gap-2.5 border border-white px-5 text-[15px] text-white"
      >
        ID
        <span className="size-4 rounded-full bg-[linear-gradient(#e70011_50%,#fff_50%)]" />
      </button>
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDivElement>(null);

  const links = NAV.map(({ href, label }) => {
    const active = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={() => menu.current?.hidePopover()}
        className={`uppercase transition-colors ${
          active ? "font-display font-bold text-white" : "text-white/70 hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  });

  return (
    <header className="header-scroll fixed inset-x-0 top-0 z-50 print:hidden bg-black/35 backdrop-blur-xl">
      <div className="wrapper flex h-14 items-center justify-between lg:h-25.5">
        <Link href="/" aria-label="Digiland 2025, ke beranda">
          {/* Mobile shows the DGLD mark only; desktop the full lockup */}
          <Image src="/dgld-mark.svg" alt="" width={44} height={16} className="lg:hidden" />
          <Image src="/dgld-digiland-2025.svg" alt="" width={74} height={54} className="hidden lg:block" />
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          <nav aria-label="Utama" className="flex items-center gap-9.5 text-base">
            {links}
          </nav>
          <Actions />
        </div>

        <button
          type="button"
          popoverTarget="mobile-nav"
          aria-label="Buka menu"
          className="-mr-2.75 grid size-11 place-items-center text-white lg:hidden"
        >
          <svg viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="2.25" className="h-3 w-3.5" aria-hidden>
            <path d="M0 1.125h14M0 6h14M0 10.875h14" />
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={menu}
        popover="auto"
        className="m-0 size-full max-h-none max-w-none bg-[#140810]/95 p-0 text-white backdrop-blur-xl"
      >
        <div className="wrapper flex h-full flex-col">
          <div className="flex h-14 items-center justify-end">
            <button
              type="button"
              popoverTarget="mobile-nav"
              popoverTargetAction="hide"
              aria-label="Tutup menu"
              className="-mr-2 p-2"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Utama" className="flex flex-col gap-6 pt-4 text-xl">
            {links}
          </nav>
          <div className="mt-10 flex gap-4">
            <Actions />
          </div>
        </div>
      </div>
    </header>
  );
}
