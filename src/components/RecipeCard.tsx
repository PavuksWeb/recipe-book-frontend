import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '@/types/recipe';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:scale-[1.02] hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{recipe.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{recipe.country}</span>
            <span>•</span>
            <span>{recipe.category}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm">
          <span className="text-muted-foreground">
            {recipe.ingredients.length} ingredients
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
