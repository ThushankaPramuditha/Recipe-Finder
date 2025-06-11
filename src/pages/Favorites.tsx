
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      setFavorites(savedFavorites);
    };

    loadFavorites();
    
    // Listen for storage changes to update favorites when changed from other tabs
    const handleStorageChange = () => {
      loadFavorites();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const removeFavorite = (recipeId: string, recipeName: string) => {
    const updatedFavorites = favorites.filter(recipe => recipe.idMeal !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    
    toast({
      title: "Removed from favorites",
      description: `${recipeName} has been removed from your favorites.`,
    });
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    
    toast({
      title: "All favorites cleared",
      description: "All recipes have been removed from your favorites.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500 fill-current" />
              <h1 className="text-2xl font-bold text-orange-900">My Favorite Recipes</h1>
            </div>
          </div>
          
          {favorites.length > 0 && (
            <Button
              onClick={clearAllFavorites}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No favorite recipes yet</h2>
            <p className="text-gray-500 mb-6">
              Start exploring recipes and add them to your favorites to see them here!
            </p>
            <Link to="/">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Discover Recipes
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-orange-700 mb-6">
              You have {favorites.length} favorite recipe{favorites.length !== 1 ? 's' : ''}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((recipe) => (
                <Card key={recipe.idMeal} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white border-orange-100">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-48 object-cover rounded-t-lg"
                        loading="lazy"
                      />
                      <Button
                        onClick={() => removeFavorite(recipe.idMeal, recipe.strMeal)}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-2"
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
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
                      
                      <div className="flex gap-2">
                        <Link to={`/recipe/${recipe.idMeal}`} className="flex-1">
                          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                            View Recipe
                          </Button>
                        </Link>
                        <Button
                          onClick={() => removeFavorite(recipe.idMeal, recipe.strMeal)}
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50 px-3"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
