import { useState, useEffect } from 'react';
import { useGetRecipesQuery } from '@/services/recipesApi';
import RecipeCard from './RecipeCard';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

export default function RecipesSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const limit = 12;
  const skip = (page - 1) * limit;

  const { data, isLoading, isFetching } = useGetRecipesQuery({
    limit,
    skip,
    q: search,
    sortBy,
    order,
  });

  useEffect(() => {
    setPage(1);
  }, [search, sortBy, order]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div id="recipes" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Recipes</h2>
          <p className="text-xl text-gray-600">Browse our collection of delicious recipes</p>
        </div>

        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search recipes..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Default</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="prepTimeMinutes">Prep Time</option>
              <option value="caloriesPerServing">Calories</option>
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
          </div>
        ) : data && data.recipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No recipes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
