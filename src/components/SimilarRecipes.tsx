import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '@/types/recipe';

interface SimilarRecipesProps {
  recipes: Recipe[];
  currentRecipeId: string;
  category: string;
}

const SimilarRecipes: React.FC<SimilarRecipesProps> = ({
  recipes,
  currentRecipeId,
  category,
}) => {
  const similarRecipes = recipes.filter(
    (recipe) => recipe.category === category && recipe.id !== currentRecipeId
  );

  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">More {category} Recipes</h2>

      {similarRecipes.length > 0 ? (
        <div className="space-y-4">
          {similarRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="flex items-center gap-3 group"
            >
              <div className="w-16 h-16 overflow-hidden rounded-md flex-shrink-0">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover transition-all group-hover:scale-110"
                />
              </div>
              <div>
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {recipe.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {recipe.country}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No other {category.toLowerCase()} recipes found.
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-border">
        <Link
          to={`/recipes/category/${category}`}
          className="text-primary hover:underline text-sm font-medium"
        >
          View all {category} recipes
        </Link>
      </div>
    </div>
  );
};

export default SimilarRecipes;
