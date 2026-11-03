import Image from "next/image";
import Link from "next/link";
import ArrowLink from "@/components/arrow-link";

// ponytail: hardcoded until the article source (CMS/API) exists
const ARTICLES = [
  {
    slug: "telkom-gelar-digiland-run-2024",
    title: "Telkom Gelar Digiland Run 2024",
    date: "2024-06-04",
    image: "/articles/gelar-digiland-run.png",
  },
  {
    slug: "antusiasme-tinggi-tiket-flash-sale-early-bird",
    title: "Antusiasme Tinggi, Lebih Dari 4.000 Tiket Flash Sale Dan Early Bird Sold Out",
    date: "2024-06-13",
    image: "/articles/press-conference.png",
  },
  {
    slug: "telkom-sukses-inspirasi-pengunjung-digiland-2023",
    title: "Telkom Sukses Inspirasi Lebih Dari 3.500 Pengunjung Digiland 2023",
    date: "2024-05-19",
    image: "/articles/sukses-inspirasi.png",
  },
];

const formatDate = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
}).format;

export default function Articles() {
  return (
    <section className="bg-white bg-[radial-gradient(380px_320px_at_5%_200px,#d3d9e0,transparent)] pt-11 pb-20 md:pt-32 md:pb-37">
      {/* md+: button sits beside the heading; mobile: it moves below the cards (order-last) */}
      <div className="wrapper grid items-end gap-x-4 md:grid-cols-[1fr_auto]">
        <h2 className="w-min font-display text-[38px] leading-9 font-extrabold text-black uppercase md:w-auto md:text-[40px] md:leading-none md:text-ink">
          Artikel Terbaru
        </h2>
        <div className="max-md:order-last max-md:mt-10 max-md:justify-self-end">
          <ArrowLink href="/artikel" icon="up-right">
            Lihat lebih banyak
          </ArrowLink>
        </div>

        <ul className="mt-10 grid gap-10 md:col-span-2 md:mt-21.5 md:grid-cols-3 md:gap-6">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link href={`/artikel/${a.slug}`} className="group relative block h-64.25 overflow-hidden text-white md:aspect-368/257 md:h-auto">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 368px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-26.75 bg-linear-to-r from-brand from-38% to-brand/0 to-88% px-4 pt-3">
                  <time dateTime={a.date} className="text-sm">
                    {formatDate(new Date(`${a.date}T00:00:00+07:00`))}
                  </time>
                  <h3 className="mt-0.5 line-clamp-2 font-display leading-6.75 font-bold">{a.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
