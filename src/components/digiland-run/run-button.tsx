import type { ReactNode } from "react";

export function ArrowIcon({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={down ? "run-arrow run-arrow-down" : "run-arrow"}>
      <path d="M5 15 15 5M5 5h10v10" />
    </svg>
  );
}

export default function RunButton({ children, href, filled = false, light = false, className = "" }: {
  children: ReactNode;
  href: string;
  filled?: boolean;
  light?: boolean;
  className?: string;
}) {
  const external = href.startsWith("https://");
  return (
    <a className={`run-button ${filled ? "run-button-filled" : ""} ${light ? "run-button-light" : ""} ${className}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}<ArrowIcon />
    </a>
  );
}
