import { useNavigate } from 'react-router-dom';
import { ChefHat, Search, BookOpen } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-lg transition shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Browse Recipes
            </button>

            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-orange-600 rounded-xl font-semibold text-lg transition border-2 border-orange-600 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Manage Recipes
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Search & Filter</h3>
            <p className="text-gray-600">Find recipes by name, cuisine, or ingredients with powerful search</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <ChefHat className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Easy to Follow</h3>
            <p className="text-gray-600">Step-by-step instructions with prep and cook times</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Your Own</h3>
            <p className="text-gray-600">Create, edit, and organize your personal recipe collection</p>
          </div>
        </div>
      </div>
    </div>
  );
}
