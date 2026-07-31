import Reveal from "./Reveal";
import { getPlaceholderImage } from "@/lib/placeholders";

const insights = [
  {
    cat: "Design & Development",
    read: "6 min read",
    title: "Building a Jewellery Collection That Is Ready for Production",
    excerpt: "Practical manufacturing insight for jewellery brands moving from concept to dependable production.",
    img: getPlaceholderImage("mangalsutras", 800)
  },
  {
    cat: "Sampling",
    read: "5 min read",
    title: "What Brands Should Know Before Approving a Jewellery Sample",
    excerpt: "Practical manufacturing insight for jewellery brands moving from concept to dependable production.",
    img: getPlaceholderImage("bangles", 800)
  },
  {
    cat: "Quality",
    read: "7 min read",
    title: "Design Consistency Across Small and Large Production Runs",
    excerpt: "Practical manufacturing insight for jewellery brands moving from concept to dependable production.",
    img: getPlaceholderImage("general_alt", 800)
  }
];

export default function Insights() {
  return (
    <section className="py-[120px] max-md:py-[78px]" id="insights">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.3fr] gap-7 lg:gap-[70px] items-start mb-[70px]">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Insights</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-[clamp(48px,5.7vw,86px)] leading-[0.96] tracking-[-0.045em] m-0">
              Practical Thinking for Better Jewellery Production.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {insights.map((insight, i) => (
            <Reveal key={i} delay={i * 100}>
              <article className="border-t border-ira-teal pt-[14px]">
                <div className="h-[300px] bg-[#d8d3ca] overflow-hidden mb-4">
                  <img 
                    src={insight.img} 
                    alt={insight.title}
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="flex justify-between text-ira-muted text-[10px] uppercase tracking-[0.08em] mb-4">
                  <span>{insight.cat}</span>
                  <span>{insight.read}</span>
                </div>
                <h3 className="font-serif text-[30px] font-normal leading-[1.06] m-0 mb-3">{insight.title}</h3>
                <p className="text-ira-muted m-0">{insight.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
