
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setIsFavorite(favorites.some((fav: Recipe) => fav.idMeal === recipe.idMeal));
  }, [recipe.idMeal]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: Recipe) => fav.idMeal !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white border-orange-100">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover rounded-t-lg"
            loading="lazy"
          />
          <Button
            onClick={toggleFavorite}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-2"
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} 
            />
          </Button>
          
          {recipe.strCategory && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-orange-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {recipe.strCategory}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-orange-900 mb-2 line-clamp-2">
            {recipe.strMeal}
          </h3>
          
          {recipe.strArea && (
            <p className="text-orange-600 text-sm mb-3">
              🌍 {recipe.strArea} Cuisine
            </p>
          )}
          
          <Link to={`/recipe/${recipe.idMeal}`}>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              View Recipe
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
