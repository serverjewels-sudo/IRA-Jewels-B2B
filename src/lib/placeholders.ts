const CATEGORY_IDS: Record<string, string> = {
  "rings": "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Diamond_engagement_ring_on_velvet_202608010317.jpeg",
  "earrings": "1535632066927-ab7c9ab60908",
  "pendants": "1581403341630-a6e0b9d2d257",
  "necklaces": "1599643477877-530eb83abc8e",
  "bracelets": "1611591437281-460bfbe1220a",
  "bangles": "1611085583191-a3b181a88401",
  "mangalsutras": "1589674781759-c21c37956a44",
  "mens-jewellery": "1566977744263-79e677f4e7cf",
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
