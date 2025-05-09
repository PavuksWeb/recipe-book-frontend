import {
  MealDbMeal,
  MealDbResponse,
  Recipe,
  FilterParams,
} from '@/types/recipe';

const API_BASE_URL = 'http://localhost:5000';

const convertMealToRecipe = (meal: MealDbMeal): Recipe => {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof MealDbMeal];
    if (
      ingredient &&
      typeof ingredient === 'string' &&
      ingredient.trim() !== ''
    ) {
      ingredients.push(ingredient);
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    country: meal.strArea,
    category: meal.strCategory,
    instructions: meal.strInstructions,
    ingredients,
  };
};

export const fetchRecipes = async (
  filter?: FilterParams
): Promise<Recipe[]> => {
  try {
    let endpoint = '/recipes';

    if (filter) {
      if (filter.type === 'country') {
        endpoint += `?area=${encodeURIComponent(filter.value || '')}`;
      } else if (filter.type === 'category') {
        endpoint += `?category=${encodeURIComponent(filter.value || '')}`;
      } else if (filter.type === 'ingredient') {
        endpoint += `?ingredient=${encodeURIComponent(filter.value || '')}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      return [];
    }

    return data.map(convertMealToRecipe);
  } catch (error) {
    console.error('Error fetching recipes', error);
    return [];
  }
};

export const fetchRecipe = async (id: string): Promise<Recipe | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/info?id=${id}`);

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return undefined;
    }

    return convertMealToRecipe(data);
  } catch (error) {
    console.error('Error fetching recipe details', error);
    return undefined;
  }
};
