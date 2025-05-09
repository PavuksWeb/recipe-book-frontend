import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Recipe } from '@/types/recipe';
import { fetchRecipe, fetchRecipes } from '@/services/api';
import RecipeDetail from '@/components/RecipeDetail';
import SimilarRecipes from '@/components/SimilarRecipes';
import { toast } from '@/components/ui/sonner';

const RecipeInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const recipeData = await fetchRecipe(id);
          if (recipeData) {
            setRecipe(recipeData);
            // Fetch recipes in the same category for similar recipes component
            const allRecipesData = await fetchRecipes({
              type: 'category',
              value: recipeData.category
            });
            setAllRecipes(allRecipesData);
          } else {
            toast.error("Recipe not found");
            navigate('/recipes');
          }
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        toast.error("Failed to load recipe details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, navigate]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-[300px] bg-gray-200 rounded-lg"></div>
          <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Recipe not found</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecipeDetail recipe={recipe} />
        </div>
        <div>
          <SimilarRecipes 
            recipes={allRecipes} 
            currentRecipeId={recipe?.id || ''} 
            category={recipe?.category || ''} 
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeInfoPage;
