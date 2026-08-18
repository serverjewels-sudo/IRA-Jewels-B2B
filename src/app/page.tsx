import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SliceProcess from "@/components/SliceProcess";
import SlicePartnership from "@/components/SlicePartnership";
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
        <div className="relative">
          <div className="sticky top-0 h-screen z-0 overflow-hidden">
            <Hero />
          </div>
          <div className="sticky top-0 h-screen z-10 overflow-hidden">
            <SliceProcess />
          </div>
          <div className="sticky top-0 h-screen z-20 overflow-hidden">
            <SlicePartnership />
          </div>
        </div>
        <TrustHighlights />
        <AboutTeaser />



        <CategoryPreview />







        <HomeCta />
      </main>
      <Footer />
    </>
  );
}
