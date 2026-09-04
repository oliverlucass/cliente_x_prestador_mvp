import type { Service } from "@/types/service";

export const searchSuggestions = [
  "Home Cleaning",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Moving",
  "Painting",
  "Pet Care",
  "Tutoring",
] as const;

export const services: Service[] = [
  {
    id: "1",
    slug: "premium-home-cleaning",
    title: "Premium Home Cleaning",
    description:
      "Deep cleaning for apartments and houses with eco-friendly products and flexible scheduling.",
    category: "Home Cleaning",
    rating: 4.9,
    reviewCount: 284,
    priceLabel: "From $89",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731541-6d8f511be048?w=800&q=80",
    imageAlt: "Professional home cleaning service",
  },
  {
    id: "2",
    slug: "emergency-plumbing",
    title: "Emergency Plumbing Repair",
    description:
      "Licensed plumbers available 24/7 for leaks, clogs, and urgent pipe repairs.",
    category: "Plumbing",
    rating: 4.8,
    reviewCount: 412,
    priceLabel: "From $120",
    imageUrl:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80",
    imageAlt: "Plumber repairing pipes",
  },
  {
    id: "3",
    slug: "electrical-inspection",
    title: "Electrical Safety Inspection",
    description:
      "Certified electricians for panel checks, wiring audits, and code-compliant upgrades.",
    category: "Electrical",
    rating: 4.7,
    reviewCount: 156,
    priceLabel: "From $95",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    imageAlt: "Electrician inspecting electrical panel",
  },
  {
    id: "4",
    slug: "garden-landscaping",
    title: "Garden & Landscaping Design",
    description:
      "Transform outdoor spaces with planting, lawn care, and seasonal maintenance plans.",
    category: "Landscaping",
    rating: 4.9,
    reviewCount: 198,
    priceLabel: "From $150",
    imageUrl:
      "https://images.unsplash.com/photo-1558904544-1abb24093164?w=800&q=80",
    imageAlt: "Landscaped garden with green lawn",
  },
  {
    id: "5",
    slug: "local-moving",
    title: "Local Moving Assistance",
    description:
      "Reliable movers for packing, loading, and same-day local relocations.",
    category: "Moving",
    rating: 4.6,
    reviewCount: 327,
    priceLabel: "From $199",
    imageUrl:
      "https://images.unsplash.com/photo-1600518464441-915588a7824a?w=800&q=80",
    imageAlt: "Moving boxes in a bright room",
  },
  {
    id: "6",
    slug: "interior-painting",
    title: "Interior Painting & Finishing",
    description:
      "Professional painters delivering smooth finishes with low-VOC paints.",
    category: "Painting",
    rating: 4.8,
    reviewCount: 241,
    priceLabel: "From $110",
    imageUrl:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
    imageAlt: "Painter applying paint to interior wall",
  },
  {
    id: "7",
    slug: "pet-sitting-care",
    title: "Pet Sitting & Daily Care",
    description:
      "Trusted sitters for walks, feeding, and overnight care tailored to your pets.",
    category: "Pet Care",
    rating: 4.9,
    reviewCount: 318,
    priceLabel: "From $45",
    imageUrl:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
    imageAlt: "Happy dog being cared for outdoors",
  },
  {
    id: "8",
    slug: "math-tutoring",
    title: "One-on-One Math Tutoring",
    description:
      "Personalized sessions for students of all levels with clear goals and progress tracking.",
    category: "Tutoring",
    rating: 4.8,
    reviewCount: 167,
    priceLabel: "From $55",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    imageAlt: "Tutor helping a student with homework",
  },
  {
    id: "9",
    slug: "hvac-maintenance",
    title: "HVAC Maintenance & Tune-Up",
    description:
      "Seasonal system checks, filter changes, and efficiency tune-ups for year-round comfort.",
    category: "HVAC",
    rating: 4.7,
    reviewCount: 203,
    priceLabel: "From $129",
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    imageAlt: "Technician servicing an HVAC unit",
  },
];
