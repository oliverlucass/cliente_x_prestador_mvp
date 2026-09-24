export interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  budgetLabel: string;
  distance: number;
  neighborhood: string;
  city: string;
  dateLabel: string;
  timeLabel: string;
  publishedAt: string;
  clientName: string;
  clientImageUrl: string;
  clientRating: number;
  completedHires: number;
  verified: boolean;
  imageUrl: string;
  imageAlt: string;
  urgent?: boolean;
  availableToday?: boolean;
  availableWeekend?: boolean;
  interests: number;
}
