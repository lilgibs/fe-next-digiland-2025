// Shared Tailwind class sets for the Digiland Run and Community pages.

export const PAGE = "overflow-clip text-[16px] leading-[1.65] text-ink max-md:text-[14px]";

export const TITLE_FONT = "font-display font-[850]";
export const TITLE = `${TITLE_FONT} text-[40px] leading-[1.25] tracking-[-1.6px] max-xl:text-[35px] max-md:text-[29px] max-md:leading-[1.22] max-md:tracking-[-1px]`;
export const EYEBROW = "block text-[12px] font-extrabold tracking-[2px] text-brand";
// These pages use a wider mobile gutter than the homepage wrapper
export const GUTTER = "max-md:px-6 max-[23.8125rem]:px-5";

// Community form fields
export const LABEL = "block font-archivo text-[18px] leading-[24px] font-extrabold tracking-[-.4px] max-md:text-[16px]";
export const LABEL_NOTE = "ml-1 font-sans text-[14px] font-normal tracking-normal max-md:text-[12px]";
export const CONTROL = "block h-9 w-full rounded-none border-b border-[#25313c] bg-transparent px-0 pt-0.75 pb-1.25 text-[18px] leading-[27px] text-[#202c38] outline-none transition-[border-color,box-shadow] duration-150 placeholder:opacity-100 focus:border-[#269ea5] focus:shadow-[0_1px_0_#269ea5] aria-invalid:border-brand max-lg:text-[16px] max-md:h-11 max-md:pt-1.5 motion-reduce:transition-none";
export const ERROR = "mt-2 text-[13px] leading-[1.6] text-[#a21b64]";

const VARIANTS = {
  outline: "border-[#646464] text-ink hover:border-ink hover:bg-ink hover:text-white",
  filled: "border-brand bg-brand text-white hover:border-[#861653] hover:bg-[#861653]",
  light: "border-white/70 text-white hover:border-white hover:bg-white hover:text-[#78235c]",
};

const SIZES = {
  md: "min-h-12 gap-3.5 px-3.75 py-2.5 text-[14px]",
  // Race-card pill; below lg it scales with the card (cqw)
  sm: "min-h-9 gap-2 px-2.5 py-1.75 text-[12px] whitespace-nowrap max-xl:gap-1 max-xl:px-1.75 max-lg:min-h-[10.5cqw] max-lg:gap-[3cqw] max-lg:px-[3cqw] max-lg:py-[2cqw] max-lg:text-[4cqw] [&_svg]:size-4 max-lg:[&_svg]:size-[4.5cqw]",
};

export function runButton({ variant = "outline", size = "md" }: { variant?: keyof typeof VARIANTS; size?: keyof typeof SIZES } = {}) {
  return `group/btn inline-flex items-center justify-center border leading-[1.4] font-medium transition-colors duration-200 motion-reduce:transition-none print:hidden ${VARIANTS[variant]} ${SIZES[size]}`;
}

export function ArrowIcon({ down = false }: { down?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={`size-[19px] shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
        down ? "rotate-180 group-hover/btn:-translate-x-0.5 group-hover/btn:translate-y-0.5" : "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      }`}
    >
      <path d="M5 15 15 5M5 5h10v10" />
    </svg>
  );
}
