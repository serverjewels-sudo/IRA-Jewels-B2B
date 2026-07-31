import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-ira-ivory flex flex-col">
      <Header />
      <main className="flex-grow pt-[140px] pb-[120px] max-md:pt-[120px] max-md:pb-[78px]">
        <section className="w-[calc(100%-56px)] mx-auto mb-16">
          <div className="w-32 h-4 bg-gray-200 animate-pulse mb-6"></div>
          <div className="w-96 max-w-[80%] h-12 bg-gray-200 animate-pulse"></div>
        </section>

        <section className="w-[calc(100%-56px)] mx-auto mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white border border-ira-border flex flex-col h-full">
                <div className="aspect-[4/5] bg-gray-200 animate-pulse"></div>
                <div className="p-5 flex flex-col flex-grow gap-3">
                  <div className="w-1/2 h-3 bg-gray-200 animate-pulse mb-1"></div>
                  <div className="w-3/4 h-6 bg-gray-200 animate-pulse"></div>
                  <div className="w-1/3 h-4 bg-gray-200 animate-pulse mb-4"></div>
                  
                  <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-ira-border/50">
                    <div className="w-full h-[42px] bg-gray-200 animate-pulse"></div>
                    <div className="w-full h-[42px] bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
