import Articles from "@/components/articles";
import Cta from "@/components/cta";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Intro from "@/components/intro";
import Music from "@/components/music";
import Pasar from "@/components/pasar";
import RunBanner from "@/components/run-banner";
import RunCategories from "@/components/run-categories";
import Sponsors from "@/components/sponsors";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Intro />
        <RunBanner />
        <RunCategories />
        <Music />
        <Pasar />
        <Articles />
        <Cta />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
