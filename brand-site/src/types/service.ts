export interface Service {
  id: string;
  slug: string;
  title: string;
  provider: string;
  profession: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceLabel: string;
  priceDetail: string;
  distance: number;
  neighborhood: string;
  city: string;
  responseTime: string;
  completedJobs: number;
  verified: boolean;
  imageUrl: string;
  imageAlt: string;
  providerImageUrl: string;
  availableToday?: boolean;
  availableWeekend?: boolean;
  tags: string[];
}
