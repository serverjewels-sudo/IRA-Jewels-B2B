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
      <script dangerouslySetInnerHTML={{
        __html: `
          if (window.location.hash.includes('type=recovery')) {
            window.location.replace('/reset-password' + window.location.hash);
          }
        `
      }} />
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
