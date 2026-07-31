'use client'

import { useEffect, useRef, useState } from 'react'
import { getPlaceholderImage } from '@/lib/placeholders'

interface WatermarkedImageProps {
  imageUrl?: string | null;
  category?: string | null;
  buyerCompanyName: string;
  buyerId: string;
  altText?: string;
}

export default function WatermarkedImage({ imageUrl, category, buyerCompanyName, buyerId, altText }: WatermarkedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine source URL
    let src = imageUrl;
    if (!src || src.trim() === '') {
      src = getPlaceholderImage(category, 800);
    }

    const img = new window.Image();
    img.crossOrigin = "anonymous";

    const drawWatermark = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      // Format: 31 Jul 2026
      const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      const text = `${buyerCompanyName} · ${buyerId} · Ira Jewels Confidential · ${date}`;

      ctx.save();
      
      // Style - dynamically scale font size relative to image width
      const fontSize = Math.max(14, Math.floor(canvas.width * 0.025)); 
      ctx.font = `500 ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = "rgba(1, 67, 93, 0.12)"; // Deep Teal #01435D at 12% opacity
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Rotate -30 degrees
      const angle = -30 * Math.PI / 180;
      
      // Calculate grid spacing based on text width
      const textWidth = ctx.measureText(text).width;
      const stepX = textWidth * 1.3;
      const stepY = fontSize * 5;
      
      // Calculate diagonal to cover the rotated bounding box
      const diag = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
      
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);

      // Tile the watermark
      for (let x = -diag; x < diag; x += stepX) {
        for (let y = -diag; y < diag; y += stepY) {
          ctx.fillText(text, x, y);
        }
      }

      ctx.restore();
    };

    img.onload = () => {
      if (!active) return;
      setLoading(false);
      
      // Set canvas to intrinsic image dimensions for sharpness
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      // Draw image
      ctx.drawImage(img, 0, 0);

      // Draw watermark
      drawWatermark(canvas, ctx);
    };

    img.onerror = () => {
      if (!active) return;
      setLoading(false);
      setError(true);
    };

    img.src = src;

    return () => {
      active = false;
    };
  }, [imageUrl, category, buyerCompanyName, buyerId]);

  return (
    <div className="relative w-full aspect-square bg-[#e5e0d7] overflow-hidden border-b border-ira-border group">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-ira-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center text-ira-muted text-sm uppercase tracking-widest">
          Image Error
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        aria-label={altText || 'Product Image'}
        title={altText || 'Product Image'}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'} group-hover:scale-105 transition-transform duration-700 ease-out`}
        onContextMenu={(e) => e.preventDefault()} // Basic right-click protection
      />
    </div>
  );
}
