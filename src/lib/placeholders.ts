const CATEGORY_IDS: Record<string, string> = {
  "rings": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Diamond_engagement_ring_on_velvet_202608010317.jpeg",
  "earrings": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Diamond_drop_earrings_on_velvet_202608010319.jpeg",
  "pendants": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Diamond_pendant_on_gold_chain_202608010326.jpeg",
  "necklaces": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Diamond_necklace_on_velvet_surface_202608010327.jpeg",
  "bracelets": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Diamond_tennis_bracelet_on_velvet_202608010328.jpeg",
  "bangles": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Gold_bangle_with_diamond_detailing_202608010329.jpeg",
  "mangalsutras": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Gold_pendant_on_black_beads_202608010332.jpeg",
  "mens-jewellery": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Men's_signet_ring_yellow_gold_202608010334.jpeg",
  "general": "1620288627223-53302f4e8c74",
  "general_alt": "1603561596112-0a132b757442"
};

export function getPlaceholderImage(category?: string | null, width: number = 800): string {
  const catKey = (category || '').toLowerCase();
  let id = CATEGORY_IDS[catKey];
  
  if (!id) {
    id = CATEGORY_IDS["general"];
  }
  
  if (id.startsWith('http')) {
    return id;
  }
  
  return `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;
}
