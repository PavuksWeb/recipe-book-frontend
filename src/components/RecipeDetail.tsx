
import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '@/types/recipe';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="w-full h-[300px] object-cover"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
        
        <Link to={`/recipes/country/${recipe.country}`}>
          <Button variant="outline" className="text-md">
            {recipe.country}
          </Button>
        </Link>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          <Card className="p-4 bg-muted/50">
            <p className="leading-relaxed">{recipe.instructions}</p>
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
          <Card className="p-4 bg-muted/50">
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <Link to={`/recipes/ingredient/${ingredient}`}>
                    <Button variant="link" className="p-0 h-auto text-md">
                      {ingredient}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
