import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustHighlights from "@/components/TrustHighlights";
import AboutTeaser from "@/components/AboutTeaser";



import CategoryPreview from "@/components/CategoryPreview";







import HomeCta from "@/components/HomeCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustHighlights />
        <AboutTeaser />



        <CategoryPreview />







        <HomeCta />
      </main>
      <Footer />
    </>
  );
}
