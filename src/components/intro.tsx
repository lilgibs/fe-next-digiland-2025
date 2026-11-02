import Image from "next/image";
import Countdown from "@/components/countdown";

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-white bg-[radial-gradient(440px_340px_at_100%_510px,#cad5de,transparent)] pt-10 pb-32 md:pt-16 md:pb-16 lg:pt-25 lg:pb-32">
      <div className="wrapper relative">
        {/* Mobile: in flow above the tagline; lg: watermark pinned top-left */}
        <Image
          src="/dgld_mark.png"
          alt=""
          width={337}
          height={139}
          className="max-md:w-38 md:hidden lg:absolute lg:-top-8 lg:left-4 lg:block"
        />
        <div className="mt-13.25 max-w-170 md:mt-0 lg:ml-104">
          <h2>
            <Image src="/elevating_your_joy.png" alt="Elevating Your Joy" width={325} height={63} className="max-md:w-64" />
          </h2>
          <p className="mt-6.75 text-base leading-6 text-[#333] md:mt-4 md:leading-[2.1]">
            Menghadirkan Digiland sebagai pengalaman yang imersif, interaktif, dengan didorong oleh
            inovasi, yang menyajikan kebahagiaan, mempererat hubungan, serta menyebarkan energi
            positif yang berkelanjutan melalui teknologi, hiburan, pemberdayaan, dan komunitas,
            untuk menciptakan keterlibatan yang lebih mendalam dengan masyarakat serta memberi
            dampak jangka panjang.
          </p>
        </div>
      </div>

      <div className="mt-8.75 sm:px-4 md:mt-6 lg:mt-1 lg:px-0">
        <Countdown />
      </div>
    </section>
  );
}
