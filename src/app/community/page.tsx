import type { Metadata } from "next";
import CommunityForm from "@/components/community/community-form";
import RunHero from "@/components/digiland-run/run-hero";
import { GUTTER, PAGE, TITLE_FONT } from "@/components/digiland-run/run-ui";
import Footer from "@/components/footer";
import Sponsors from "@/components/sponsors";

export const metadata: Metadata = {
  title: "Formulir Komunitas | Digiland Run 2025",
  description: "Daftarkan komunitasmu untuk mendapatkan penawaran spesial dan menjadi bagian dari Road To Digiland Run 2025.",
};

export default function CommunityPage() {
  return (
    <>
      <main className={PAGE}>
        <RunHero />
        <section className="bg-[radial-gradient(ellipse_560px_430px_at_17%_8%,#e8dce7b3,transparent)] pt-16 pb-17 max-md:pt-12 max-md:pb-7.5" aria-labelledby="community-form-heading">
          <div className={`wrapper ${GUTTER} grid grid-cols-[28%_minmax(0,1fr)] items-start gap-x-11.5 max-lg:grid-cols-[29%_minmax(0,1fr)] max-lg:gap-7 max-md:grid-cols-1`}>
            <h2 id="community-form-heading" className={`${TITLE_FONT} text-[40px] leading-none tracking-[-1.3px] max-xl:text-[35px] max-lg:text-[clamp(29px,3.8vw,35px)]`}>
              FORMULIR<br />KOMUNITAS
            </h2>
            <div>
              <p className="text-[16px] leading-[26px] max-md:text-[14px] max-md:leading-[24px]">
                Masukkan Data Komunitasmu untuk mendapatkan Penawaran spesial Event Digiland Run 2025<br className="max-lg:hidden" />{" "}
                Dapatkan banyak benefit dengan bergabung dalam kegiatan <strong className="font-archivo font-extrabold tracking-[-.35px]">Road To Digiland Run 2025.</strong>
              </p>
              <CommunityForm />
            </div>
          </div>
        </section>
        <Sponsors title="Sponsor and Partner" />
      </main>
      <Footer />
    </>
  );
}
