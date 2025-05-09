import {
  MealDbMeal,
  MealDbResponse,
  Recipe,
  FilterParams,
} from '@/types/recipe';

// Convert TheMealDB meal to our Recipe format
const convertMealToRecipe = (meal: MealDbMeal): Recipe => {
  // Extract ingredients from meal (strIngredient1, strIngredient2, etc.)
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

try {
    let url = "https://www.themealdb.com/api/json/v1/1/";
    
    // Determine endpoint based on filter
    if (!filter || filter.type === 'all') {
      url += "search.php?s="; // Search with empty string to get multiple recipes
    } else if (filter.type === 'country') {
      url += `filter.php?a=${encodeURIComponent(filter.value || '')}`;
    } else if (filter.type === 'category') {
      url += `filter.php?c=${encodeURIComponent(filter.value || '')}`;
    } else if (filter.type === 'ingredient') {
      url += `filter.php?i=${encodeURIComponent(filter.value || '')}`;
    }
    
    const response = await fetch(url);
    const data: MealDbResponse = await response.json();
    
    if (!data.meals) {
      return [];
    }

    // For filtered results, we need to fetch full details for each meal
    // as filter endpoints only return partial info
    if (filter?.type !== 'all' && filter?.type !== undefined) {
      const detailedRecipes = await Promise.all(
        data.meals.map(async (meal) => {
          const detailResponse = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          );
          const detailData: MealDbResponse = await detailResponse.json();
          if (detailData.meals && detailData.meals.length > 0) {
            return convertMealToRecipe(detailData.meals[0]);
          }
          return null;
        })
      );
      
      return detailedRecipes.filter((recipe): recipe is Recipe => recipe !== null);
    }
    
    // Convert all meals to our Recipe format
    return data.meals.map(convertMealToRecipe);
  } catch (error) {
    console.error("Error fetching recipes from TheMealDB:", error);
    return [];
  }
};

export const fetchRecipe = async (id: string): Promise<Recipe | undefined> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data: MealDbResponse = await response.json();
    
    if (!data.meals || data.meals.length === 0) {
      return undefined;
    }
    
    return convertMealToRecipe(data.meals[0]);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return undefined;
  }
};