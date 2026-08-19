import Reveal from "./Reveal";
import { Factory, PenTool, ScanSearch, Tag, ShieldCheck } from "lucide-react";

const highlights = [
  {
    title: "In-House Manufacturing",
    icon: (
      <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-ira-gold/40 bg-ira-pale-teal/30 flex items-center justify-center">
        <Factory className="w-6 h-6 text-ira-gold" strokeWidth={1.25} />
      </div>
    )
  },
  {
    title: "Custom Development",
    icon: (
      <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-ira-gold/40 bg-ira-pale-teal/30 flex items-center justify-center">
        <PenTool className="w-6 h-6 text-ira-gold" strokeWidth={1.25} />
      </div>
    )
  },
  {
    title: "Quality Inspection",
    icon: (
      <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-ira-gold/40 bg-ira-pale-teal/30 flex items-center justify-center">
        <ScanSearch className="w-6 h-6 text-ira-gold" strokeWidth={1.25} />
      </div>
    )
  },
  {
    title: "Private Label",
    icon: (
      <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-ira-gold/40 bg-ira-pale-teal/30 flex items-center justify-center">
        <Tag className="w-6 h-6 text-ira-gold" strokeWidth={1.25} />
      </div>
    )
  },
  {
    title: "Secure B2B Catalogue",
    icon: (
      <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-ira-gold/40 bg-ira-pale-teal/30 flex items-center justify-center">
        <ShieldCheck className="w-6 h-6 text-ira-gold" strokeWidth={1.25} />
      </div>
    )
  }
];

export default function TrustHighlights() {
  return (
    <section className="bg-white py-8 border-b border-ira-border">
      <div className="w-[calc(100%-56px)] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 text-center">
          {highlights.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex flex-col items-center justify-center">
                {item.icon}
                <h3 className="text-[11px] uppercase tracking-[0.1em] text-ira-teal font-medium m-0 max-w-[120px] mx-auto">
                  {item.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
