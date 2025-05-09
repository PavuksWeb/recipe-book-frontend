import React from 'react';
import { Recipe, FilterParams } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  filter: FilterParams;
  isLoading?: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  filter,
  isLoading = false,
}) => {
  const generateTitle = () => {
    if (filter.type === 'all') {
      return 'All Recipes';
    } else if (filter.type === 'country') {
      return `${filter.value} Recipes`;
    } else if (filter.type === 'category') {
      return `${filter.value} Recipes`;
    } else if (filter.type === 'ingredient') {
      return `Recipes with ${filter.value}`;
    }
    return 'Recipes';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Loading recipes...</h1>
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[300px] bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{generateTitle()}</h1>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl text-muted-foreground">No recipes found</h2>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
