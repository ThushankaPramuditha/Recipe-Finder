
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ChefHat, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecipeCard from '@/components/RecipeCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const searchRecipes = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Search by name first
      const nameResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const nameData = await nameResponse.json();
      
      // Search by ingredient as well
      const ingredientResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
      const ingredientData = await ingredientResponse.json();
      
      // Combine and deduplicate results
      const combinedResults: Recipe[] = [];
      const seenIds = new Set();
      
      if (nameData.meals) {
        nameData.meals.forEach((meal: Recipe) => {
          if (!seenIds.has(meal.idMeal)) {
            combinedResults.push(meal);
            seenIds.add(meal.idMeal);
          }
        });
      }
      
      if (ingredientData.meals) {
        ingredientData.meals.forEach((meal: Recipe) => {
          if (!seenIds.has(meal.idMeal)) {
            combinedResults.push(meal);
            seenIds.add(meal.idMeal);
          }
        });
      }
      
      setRecipes(combinedResults);
      
      if (combinedResults.length === 0) {
        toast({
          title: "No recipes found",
          description: `No recipes found for "${query}". Try a different search term.`,
        });
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      toast({
        title: "Search failed",
        description: "Failed to search recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes(searchTerm);
  };

  const getRandomRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        setRecipes([data.meals[0]]);
        setHasSearched(true);
        toast({
          title: "Random recipe found!",
          description: `Here's a random recipe: ${data.meals[0].strMeal}`,
        });
      }
    } catch (error) {
      console.error('Error getting random recipe:', error);
      toast({
        title: "Failed to get random recipe",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-orange-900">Tasty Recipes</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link 
                to="/favorites" 
                className="flex items-center space-x-2 text-orange-700 hover:text-orange-900 transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span className="hidden sm:inline">Favorites</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Utensils className="h-16 w-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
              Discover Delicious Recipes
            </h2>
            <p className="text-xl text-orange-700 mb-8">
              Search thousands of recipes by ingredient or name. Save your favorites and start cooking!
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by recipe name or ingredient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </form>
            
            <Button 
              onClick={getRandomRecipe}
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
              disabled={loading}
            >
              🎲 Get Random Recipe
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {loading && <LoadingSpinner />}
          
          {!loading && hasSearched && (
            <div>
              <h3 className="text-2xl font-bold text-orange-900 mb-6">
                {recipes.length > 0 ? `Found ${recipes.length} recipe${recipes.length !== 1 ? 's' : ''}` : 'No recipes found'}
              </h3>
              
              {recipes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {!loading && !hasSearched && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-xl text-orange-600">
                Start by searching for a recipe or get a random one!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
