import Reveal from "./Reveal";

const highlights = [
  {
    title: "In-House Manufacturing",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ira-gold mb-4 mx-auto">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Custom Development",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ira-gold mb-4 mx-auto">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Quality Inspection",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ira-gold mb-4 mx-auto">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Private Label",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ira-gold mb-4 mx-auto">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Secure B2B Catalogue",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ira-gold mb-4 mx-auto">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

export default function TrustHighlights() {
  return (
    <section className="bg-white py-14 border-b border-ira-border">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto">
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
