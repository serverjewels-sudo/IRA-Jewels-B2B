import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import CraftsmanshipFilm from "@/components/CraftsmanshipFilm";
import Process from "@/components/Process";
import Categories from "@/components/Categories";
import Facility from "@/components/Facility";
import Quality from "@/components/Quality";
import Confidentiality from "@/components/Confidentiality";
import WhyPartner from "@/components/WhyPartner";
import Responsibility from "@/components/Responsibility";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <CraftsmanshipFilm />
        <Process />
        <Categories />
        <Facility />
        <Quality />
        <Confidentiality />
        <WhyPartner />
        <Responsibility />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
