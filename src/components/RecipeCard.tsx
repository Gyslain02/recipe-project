import { Clock, Users, Star } from 'lucide-react';
import type { Recipe } from '@/services/recipesApi';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-900">{recipe.rating}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{recipe.name}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md font-medium">
            {recipe.cuisine}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
            {recipe.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
