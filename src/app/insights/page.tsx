import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";

const insights = [
  {
    cat: "Design & Development",
    read: "6 min read",
    title: "Building a Jewellery Collection That Is Ready for Production",
    img: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=800&auto=format&fit=crop"
  },
  {
    cat: "Sampling",
    read: "5 min read",
    title: "What Brands Should Know Before Approving a Jewellery Sample",
    img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop"
  },
  {
    cat: "Quality",
    read: "7 min read",
    title: "Design Consistency Across Small and Large Production Runs",
    img: "https://images.unsplash.com/photo-1603561596112-0a132b757442?q=80&w=800&auto=format&fit=crop"
  }
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-ira-ivory flex flex-col">
      <Header />
      
      <main className="flex-grow pt-[140px] pb-[120px] max-md:pt-[120px] max-md:pb-[78px]">
        {/* Page Header */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto mb-16">
          <Reveal>
            <p className="text-[13px] text-ira-muted tracking-[0.08em] uppercase mb-4">
              <Link href="/" className="hover:text-ira-teal transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-ira-text font-medium">Insights</span>
            </p>
            <h1 className="font-serif text-[clamp(40px,5vw,60px)] text-ira-teal leading-[1] tracking-[-0.04em] mb-4">
              Insights
            </h1>
          </Reveal>
        </section>

        {/* Card Grid */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[22px]">
            {insights.map((insight, i) => (
              <Reveal key={i} delay={i * 100}>
                {/* 
                  Static article card: 
                  - No cursor-pointer 
                  - No hover state changes (no hover:scale, hover:-translate-y)
                  - White background 
                */}
                <article className="bg-white border border-ira-border flex flex-col h-full">
                  <div className="h-[300px] bg-[#d8d3ca] overflow-hidden">
                    <img 
                      src={insight.img} 
                      alt={insight.title}
                      loading="lazy" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between text-ira-muted text-[10px] uppercase tracking-[0.08em] mb-4">
                      <span>{insight.cat}</span>
                      <span>{insight.read}</span>
                    </div>
                    <h2 className="font-serif text-[28px] text-ira-teal leading-[1.1] m-0">
                      {insight.title}
                    </h2>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
