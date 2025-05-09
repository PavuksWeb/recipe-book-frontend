
import { Recipe, FilterParams } from "@/types/recipe";

// Mock data since we don't have an actual API endpoint
const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Bolognese",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    country: "Italy",
    category: "Pasta",
    instructions: "Sauté onions and garlic. Add ground beef and cook until browned. Add tomato sauce and simmer. Serve over cooked spaghetti.",
    ingredients: ["Spaghetti", "Ground Beef", "Tomato Sauce", "Onions", "Garlic"]
  },
  {
    id: "2",
    name: "Chicken Curry",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    country: "India",
    category: "Curry",
    instructions: "Sauté onions and spices. Add chicken and cook until browned. Add coconut milk and simmer. Serve with rice.",
    ingredients: ["Chicken", "Curry Powder", "Coconut Milk", "Onions", "Rice"]
  },
  {
    id: "3",
    name: "Sushi Rolls",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    country: "Japan",
    category: "Seafood",
    instructions: "Cook sushi rice. Place nori on bamboo mat. Spread rice. Add fillings. Roll tightly. Slice into pieces.",
    ingredients: ["Sushi Rice", "Nori", "Salmon", "Cucumber", "Avocado"]
  },
  {
    id: "4",
    name: "Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    country: "Italy",
    category: "Pasta",
    instructions: "Cook pasta. Mix eggs, cheese, and pepper. Sauté bacon. Combine all ingredients while pasta is hot.",
    ingredients: ["Pasta", "Eggs", "Parmesan Cheese", "Bacon", "Black Pepper"]
  },
  {
    id: "5",
    name: "Ramen Noodle Soup",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    country: "Japan",
    category: "Soup",
    instructions: "Simmer broth with spices. Cook noodles separately. Add protein and vegetables to broth. Combine and garnish.",
    ingredients: ["Ramen Noodles", "Chicken Broth", "Soy Sauce", "Green Onions", "Boiled Egg"]
  }
];

export const fetchRecipes = async (filter?: FilterParams): Promise<Recipe[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!filter || filter.type === 'all') {
    return mockRecipes;
  }
  
  return mockRecipes.filter(recipe => {
    switch (filter.type) {
      case 'country':
        return recipe.country.toLowerCase() === filter.value?.toLowerCase();
      case 'category':
        return recipe.category.toLowerCase() === filter.value?.toLowerCase();
      case 'ingredient':
        return recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase() === filter.value?.toLowerCase()
        );
      default:
        return true;
    }
  });
};

export const fetchRecipe = async (id: string): Promise<Recipe | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRecipes.find(recipe => recipe.id === id);
};
