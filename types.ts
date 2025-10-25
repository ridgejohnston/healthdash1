
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  measurement: string;
  route: 'oral' | 'injection' | 'topical' | 'inhalation';
  description?: string;
  category?: string;
}

export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weight: number; // in lbs or kg
  bmi: number;
}

export interface HealthArticle {
  title: string;
  summary: string;
  source: string;
  url: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title:string;
  };
}

export interface SearchResult {
  summary: string;
  sources: GroundingChunk[];
}

export interface SocialUser {
  name: string;
  username: string;
  avatarUrl: string;
}

export interface SocialPost {
  id: string;
  author: SocialUser;
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

export interface SocialGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  bannerUrl: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Meal {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export interface PlannedMeal {
  date: string; // YYYY-MM-DD
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  mealId: string;
}

export interface NutritionalInfo {
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
}
