
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strSource?: string;
  strYoutube?: string;
  [key: string]: any;
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        
        if (data.meals && data.meals[0]) {
          setRecipe(data.meals[0]);
        } else {
          toast({
            title: "Recipe not found",
            description: "The recipe you're looking for doesn't exist.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        toast({
          title: "Failed to load recipe",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, toast]);

  useEffect(() => {
    if (recipe) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      setIsFavorite(favorites.some((fav: RecipeDetail) => fav.idMeal === recipe.idMeal));
    }
  }, [recipe]);

  const toggleFavorite = () => {
    if (!recipe) return;
    
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: RecipeDetail) => fav.idMeal !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast({
        title: "Removed from favorites",
        description: `${recipe.strMeal} has been removed from your favorites.`,
      });
    } else {
      favorites.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setIsFavorite(true);
      toast({
        title: "Added to favorites",
        description: `${recipe.strMeal} has been added to your favorites.`,
      });
    }
  };

  const getIngredients = () => {
    if (!recipe) return [];
    
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
    return ingredients;
  };

  const formatInstructions = (instructions: string) => {
    return instructions.split(/\r\n|\r|\n/).filter(line => line.trim()).map((step, index) => (
      <p key={index} className="mb-3 text-gray-700 leading-relaxed">
        {step}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-900 mb-4">Recipe not found</h1>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </Link>
          
          <Button
            onClick={toggleFavorite}
            variant={isFavorite ? "default" : "outline"}
            className={`${
              isFavorite 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'border-red-300 text-red-600 hover:bg-red-50'
            }`}
          >
            <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-orange-100">
              <CardContent className="p-0">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-64 lg:h-80 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-orange-900 mb-4">{recipe.strMeal}</h1>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-100 text-orange-800">
                        {recipe.strCategory}
                      </Badge>
                    </div>
                    
                    <p className="text-orange-600">
                      🌍 <span className="font-medium">{recipe.strArea}</span> Cuisine
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-4">
                      {recipe.strYoutube && (
                        <Button 
                          asChild 
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
                            <Play className="mr-2 h-4 w-4" />
                            Watch Video Tutorial
                          </a>
                        </Button>
                      )}
                      
                      {recipe.strSource && (
                        <Button 
                          asChild 
                          variant="outline" 
                          className="border-orange-300 text-orange-700 hover:bg-orange-50"
                        >
                          <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Original Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Ingredients and Instructions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ingredients */}
            <Card className="bg-white border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-orange-900">Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredients.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <span className="text-orange-500 font-bold">•</span>
                      <span className="font-medium text-orange-800">{item.measure}</span>
                      <span className="text-orange-700">{item.ingredient}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-white border-orange-100">
              <CardHeader>
                <CardTitle className="text-xl text-orange-900">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-orange max-w-none">
                  {formatInstructions(recipe.strInstructions)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
