export interface MealDbResponse {
  meals: MealDbMeal[] | null;
}

export interface MealDbMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  [key: string]: string | undefined;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  country: string;
  category: string;
  instructions: string;
  ingredients: string[];
}

export type FilterType = 'all' | 'country' | 'category' | 'ingredient';

export interface FilterParams {
  type: FilterType;
  value?: string;
}
