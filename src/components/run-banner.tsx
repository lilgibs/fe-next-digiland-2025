import Image from "next/image";

export default function RunBanner() {
  return (
    <section className="relative isolate grid h-[725px] place-items-center overflow-hidden md:h-[810px]">
      {/* Gradient sits both under the photo grid (fills the gutters) and over it (teal tint); same URL, one download */}
      <Image src="/content_gradasi.png" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <Image
        src="/content_grid.png"
        alt=""
        width={1338}
        height={810}
        sizes="1338px"
        className="absolute top-0 left-1/2 -z-10 h-full w-auto max-w-none -translate-x-1/2"
      />
      <Image src="/content_gradasi.png" alt="" fill sizes="100vw" className="-z-10 object-cover" />

      <h2>
        <Image src="/run_logo.png" alt="Digiland Run 2025" width={339} height={250} className="max-md:w-63.75" />
      </h2>
    </section>
  );
}
