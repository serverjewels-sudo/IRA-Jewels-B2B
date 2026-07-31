'use client'

import { useState } from 'react'
import WatermarkedImage from './WatermarkedImage'

interface ProductGalleryProps {
  images: string[];
  category: string;
  buyerCompanyName: string;
  buyerId: string;
  productName: string;
}

export default function ProductGallery({ images, category, buyerCompanyName, buyerId, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Ensure we always have at least one slot to render the category placeholder if images is empty
  const galleryImages = images && images.length > 0 ? images : [null];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full">
        <WatermarkedImage 
          imageUrl={galleryImages[activeIndex]} 
          category={category}
          buyerCompanyName={buyerCompanyName}
          buyerId={buyerId}
          altText={`${productName} - Main Image`}
        />
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {galleryImages.map((img, index) => (
            <button 
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-full relative aspect-square bg-[#e5e0d7] overflow-hidden border transition-colors ${activeIndex === index ? 'border-ira-teal' : 'border-ira-border hover:border-ira-gold'}`}
              aria-label={`View image ${index + 1}`}
            >
              <div className="absolute inset-0 pointer-events-none">
                <WatermarkedImage 
                  imageUrl={img} 
                  category={category}
                  buyerCompanyName={buyerCompanyName}
                  buyerId={buyerId}
                  altText={`Thumbnail ${index + 1}`}
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
