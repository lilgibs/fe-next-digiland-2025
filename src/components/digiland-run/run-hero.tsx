import Image from "next/image";

export default function RunHero() {
  return (
    <section className="run-hero" aria-labelledby="run-heading">
      <Image
        src="/bg_content_header.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="run-hero-background"
      />
      <div className="wrapper">
        <h1 id="run-heading">
          DIGILAND<br />
          <span>RUN <span className="run-year">2025</span></span>
        </h1>
        <p>
          MINGGU 18 MEI<span aria-hidden="true">—</span>ISTORA SENAYAN JAKARTA
        </p>
      </div>
    </section>
  );
}
