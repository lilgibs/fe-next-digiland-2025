import Image from "next/image";
import { GUTTER } from "./run-ui";

export default function RunHero() {
  return (
    <section
      className="relative isolate flex min-h-[540px] items-end pt-42.5 pb-20.5 text-white max-md:min-h-[440px] max-md:pt-37.5 max-md:pb-13.75"
      aria-labelledby="run-heading"
    >
      <Image src="/bg_content_header.png" alt="" fill preload sizes="100vw" className="-z-10 object-cover" />
      <div className={`wrapper ${GUTTER}`}>
        <h1
          id="run-heading"
          className="font-display text-[68px] leading-[.88] font-[850] tracking-[-3px] max-md:text-[clamp(47px,8.6vw,64px)] max-md:tracking-[-2px]"
        >
          DIGILAND
          <br />
          <span className="mt-1 inline-block">
            RUN <span className="font-light tracking-[-4px] max-md:tracking-[-3px]">2025</span>
          </span>
        </h1>
        <p className="mt-5.5 flex flex-wrap items-center gap-4.75 font-archivo text-[19px] leading-[1.4] font-extrabold max-md:mt-5 max-md:gap-2.25 max-md:text-[12px]">
          MINGGU 18 MEI
          <span aria-hidden="true" className="text-[25px] leading-none max-md:text-[16px]">
            —
          </span>
          ISTORA SENAYAN JAKARTA
        </p>
      </div>
    </section>
  );
}
