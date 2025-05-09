
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Recipe, FilterParams } from '@/types/recipe';
import { fetchRecipes } from '@/services/api';
import RecipeList from '@/components/RecipeList';

const RecipeListPage: React.FC = () => {
  const { filterType, filterValue } = useParams<{ 
    filterType?: string; 
    filterValue?: string;
  }>();
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Determine filter from URL parameters
  const filter: FilterParams = {
    type: (filterType as FilterParams['type']) || 'all',
    value: filterValue
  };
  
  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRecipes(filter);
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getRecipes();
  }, [filter.type, filter.value]);
  
  return <RecipeList recipes={recipes} filter={filter} isLoading={isLoading} />;
};

export default RecipeListPage;
