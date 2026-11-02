import Link from "next/link";

export function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

// Outlined CTA. "right" = wide button with a long arrow, "up-right" = compact button with ↗
export default function ArrowLink({
  href,
  icon = "right",
  children,
}: {
  href: string;
  icon?: "right" | "up-right";
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 shrink-0 items-center gap-4 border border-[#333] text-[#333] transition-colors hover:bg-[#333] hover:text-white ${
        icon === "right" ? "px-13 text-base" : "pr-5 pl-4 text-[15px]"
      }`}
    >
      {children}
      {icon === "right" ? (
        <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.25" className="w-6" aria-hidden>
          <path d="M0 6h23M17.5.5 23 6l-5.5 5.5" />
        </svg>
      ) : (
        <ArrowUpRight className="size-3.5" />
      )}
    </Link>
  );
}
