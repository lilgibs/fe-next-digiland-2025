import type { Metadata } from "next";
import CommunityForm from "@/components/community/community-form";
import RunHero from "@/components/digiland-run/run-hero";
import Footer from "@/components/footer";
import Sponsors from "@/components/sponsors";
import "../digiland-run/run.css";
import "./community.css";

export const metadata: Metadata = {
  title: "Formulir Komunitas | Digiland Run 2025",
  description: "Daftarkan komunitasmu untuk mendapatkan penawaran spesial dan menjadi bagian dari Road To Digiland Run 2025.",
};

export default function CommunityPage() {
  return (
    <>
      <main className="run-page community-form-page">
        <RunHero />
        <section className="community-registration" aria-labelledby="community-form-heading">
          <div className="wrapper community-registration-grid">
            <h2 id="community-form-heading" className="run-title">FORMULIR<br />KOMUNITAS</h2>
            <div className="community-registration-content">
              <p className="community-form-intro">
                Masukkan Data Komunitasmu untuk mendapatkan Penawaran spesial Event Digiland Run 2025<br />{" "}
                Dapatkan banyak benefit dengan bergabung dalam kegiatan <strong>Road To Digiland Run 2025.</strong>
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
