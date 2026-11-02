import Image from "next/image";
import ArrowLink from "@/components/arrow-link";

// ponytail: prices only appear in the mobile design, all identical; confirm real per-category prices
const CATEGORIES = [
  { title: "5K", price: "Rp 340.000" },
  { title: "10K", price: "Rp 340.000" },
  { title: "Half", sub: "Marathon", price: "Rp 340.000" },
];

export default function RunCategories() {
  return (
    <section className="relative overflow-hidden bg-white bg-[radial-gradient(330px_300px_at_6%_330px,#b9d8db,transparent),radial-gradient(240px_170px_at_59%_80px,#d4ebdf,transparent),radial-gradient(130px_260px_at_96%_150px,#d3eee9,transparent)] pb-10 md:pb-16 lg:pb-36">
      {/* Mobile: small photo pinned top-right, zoomed into the runners; lg: tall photo beside the heading */}
      <div className="absolute top-0 right-0 aspect-175/224 w-[46.67vw] overflow-hidden md:w-75 lg:right-auto lg:left-[calc(50%+216px)] lg:aspect-auto lg:h-[517px] lg:w-[431px]">
        <Image
          src="/content.jpg"
          alt="Pelari Digiland Run melewati garis start"
          fill
          sizes="(min-width: 1024px) 431px, (min-width: 768px) 300px, 47vw"
          className="origin-bottom-left scale-[1.31] object-cover object-left-bottom lg:scale-100 lg:object-bottom"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/15 to-white" />
      </div>

      <div className="wrapper relative pt-44 md:pt-72 lg:pt-33">
        <h2 className="font-display text-[min(30px,8.4vw)] leading-10 font-extrabold text-[#333] uppercase sm:text-5xl sm:leading-12 md:text-[63px] md:leading-[60px]">
          Lari untuk
          <br />
          Kebahagiaanmu
        </h2>

        {/* Mobile: stacked; md–lg: 3 equal columns filling the content width; xl: fixed 334px blobs as in the 1440 design */}
        <ul className="mt-10 flex flex-col items-center gap-5 max-md:pl-3 md:mt-19 md:grid md:grid-cols-3 md:gap-6 xl:ml-15.5 xl:flex xl:flex-row xl:items-start xl:gap-10.5">
          {CATEGORIES.map(({ title, sub, price }) => (
            <li key={title} className="w-69.75 md:w-full md:max-w-83.5 md:justify-self-center xl:w-83.5">
              <div className="@container relative">
                <Image src="/shape.png" alt="" width={334} height={202} className="h-auto w-full" />
                {/* Box is narrower than the asset so text centers on the blob body, not its offset shadow */}
                <p className="absolute inset-y-0 left-0 flex w-[94%] items-center justify-center pb-[7cqw] text-white md:pb-0">
                  <span className="flex flex-col items-start">
                    <span className="font-display text-[15.8cqw] leading-none font-extrabold uppercase">{title}</span>
                    {sub && <span className="mt-[3.3cqw] text-[6.5cqw] leading-none uppercase md:text-[9.1cqw]">{sub}</span>}
                  </span>
                </p>
              </div>
              <p className="mt-2 w-[94%] text-center font-display text-[21px] leading-tight font-semibold text-[#333] md:hidden">
                {price}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-111 leading-[1.65] font-medium text-black max-md:hidden">
          Daftar Digiland dan dapatkan *Free Kuota 15Gb* khusus pelanggan Telkomsel
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-7 md:mt-6">
          <p className="max-w-111 leading-[1.55] text-[#333] md:leading-[1.7]">
            Bersiaplah untuk Digiland Run, bagian spesial dari Digiland 2025 yang mengajak runner
            enthusiast, komunitas lari, dan masyarakat untuk berlari dengan penuh semangat dalam
            pilihan kategori 5K<span className="md:hidden"> (Fun Run)</span>, 10K
            <span className="md:hidden"> (Easy Run)</span>, dan Half Marathon.
          </p>
          <ArrowLink href="/digiland-run">Selengkapnya</ArrowLink>
        </div>
      </div>
    </section>
  );
}
