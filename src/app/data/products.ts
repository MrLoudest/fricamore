export type Product = {
  slug: string
  name: string
  price: number
  shortDescription: string
  fullDescription: string
  image: string
}

export const products: Product[] = [
  {
    slug: "silk-wash",
    name: "Silk Wash",
    price: 38,
    shortDescription: "Gentle daily cleanser with a soft finish.",
    fullDescription:
      "A quiet, daily cleanser designed to lift impurities without stripping the skin. Leaves a soft, balanced finish and a sense of calm after use.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "amber-mist",
    name: "Amber Mist",
    price: 52,
    shortDescription: "Warm, dry fragrance with restrained depth.",
    fullDescription:
      "A warm, dry fragrance anchored in soft amber and clean woods. Subtle enough for everyday, distinct enough to be remembered.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "noon-cream",
    name: "Noon Cream",
    price: 68,
    shortDescription: "Lightweight hydration for a calm glow.",
    fullDescription:
      "Lightweight hydration with a velvety feel. Balances moisture and texture for a calm, even glow through the day.",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "linen-salve",
    name: "Linen Salve",
    price: 44,
    shortDescription: "Soft, protective balm for hands and elbows.",
    fullDescription:
      "A soft, protective balm for dry areas. Absorbs quickly and leaves a natural, clean finish with no residue.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "fig-room",
    name: "Fig Room",
    price: 72,
    shortDescription: "Modern room aroma with a green edge.",
    fullDescription:
      "A modern room aroma with a crisp, green edge. Notes of fig leaf and cedar keep the mood fresh and composed.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "quiet-veil",
    name: "Quiet Veil",
    price: 58,
    shortDescription: "Soft body oil with a satin sheen.",
    fullDescription:
      "A soft body oil with a satin sheen. Designed for calm, tactile moments with a delicate, lasting finish.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "stone-candle",
    name: "Stone Candle",
    price: 64,
    shortDescription: "Low-smoke candle with mineral notes.",
    fullDescription:
      "A low-smoke candle with mineral notes and a slow, even burn. Made for quiet evenings and intentional spaces.",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "moss-tonic",
    name: "Moss Tonic",
    price: 46,
    shortDescription: "Clarifying toner with a cool finish.",
    fullDescription:
      "A clarifying toner with a cool finish. Refines texture and refreshes the skin without disrupting balance.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  },
]
