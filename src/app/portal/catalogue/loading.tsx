export default function CatalogueLoading() {
  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto animate-pulse">
      <div className="mb-12 border-b border-ira-border/50 pb-8">
        <div className="h-10 bg-ira-border/50 w-64 mb-4"></div>
        <div className="h-4 bg-ira-border/30 w-full max-w-2xl mb-2"></div>
        <div className="h-4 bg-ira-border/30 w-3/4 max-w-xl"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col bg-white border border-ira-border">
            <div className="aspect-square w-full bg-ira-border/30"></div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2 gap-2">
                <div className="h-5 bg-ira-border/40 w-3/4"></div>
                <div className="h-4 bg-ira-border/40 w-12"></div>
              </div>
              <div className="h-3 bg-ira-border/30 w-1/2 mb-4"></div>
              
              <div className="mt-auto pt-4 border-t border-ira-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="h-5 bg-ira-border/40 w-20"></div>
                <div className="h-3 bg-ira-border/30 w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
