import { useNavigate } from 'react-router-dom';
import { ChefHat, BookOpen } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  const scrollToRecipes = () => {
    document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

   
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
       
          <div className="flex items-center gap-10">
          
            <div className="flex items-center gap-2">
              <h1
                className="text-2xl font-bold text-orange-600 cursor-pointer"
       
              >
                Recipe
              </h1>
            </div>

            <nav className="flex items-center gap-6">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Home
              </button>
              <button
                onClick={scrollToRecipes}
                className="text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Recipe
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Dashboard
              </button>
            </nav>
          </div>
        </div>
      </header>

      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 sm:pb-32">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 rounded-full mb-8 shadow-lg">
            <ChefHat className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Delicious
            <span className="block text-orange-600">Recipes</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of recipes from around the world. Find your next favorite dish and start cooking today.
          </p>

        </div>
      </div>
    </div>
  );
}
