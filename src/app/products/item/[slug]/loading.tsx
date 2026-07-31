import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-ira-ivory flex flex-col">
      <Header />
      <main className="flex-grow pt-[140px] pb-[120px] max-md:pt-[120px] max-md:pb-[78px]">
        {/* Breadcrumb Skeleton */}
        <section className="w-[calc(100%-56px)] mx-auto mb-10">
          <div className="w-64 h-4 bg-gray-200 animate-pulse"></div>
        </section>

        {/* 2-Column Detail Skeleton */}
        <section className="w-[calc(100%-56px)] mx-auto mb-24">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left: Image Skeleton */}
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/5] bg-gray-200 animate-pulse w-full max-w-[600px]"></div>
            </div>
            
            {/* Right: Info Skeleton */}
            <div className="w-full lg:w-1/2 flex flex-col pt-4">
              <div className="w-3/4 h-10 bg-gray-200 animate-pulse mb-4"></div>
              <div className="w-1/4 h-4 bg-gray-200 animate-pulse mb-8"></div>
              
              <div className="space-y-4 mb-8">
                <div className="w-1/2 h-6 bg-gray-200 animate-pulse"></div>
                <div className="w-1/2 h-6 bg-gray-200 animate-pulse"></div>
                <div className="w-2/3 h-6 bg-gray-200 animate-pulse"></div>
              </div>
              
              <div className="space-y-2 mb-10">
                <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 animate-pulse"></div>
              </div>
              
              <div className="flex flex-col gap-4 mt-auto">
                <div className="w-full max-w-[400px] h-12 bg-gray-200 animate-pulse rounded-[5px]"></div>
                <div className="w-full max-w-[400px] h-12 bg-gray-200 animate-pulse rounded-[5px]"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
