import { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';
import type { Recipe } from '@/services/recipesApi';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RecipeFormData) => void;
  recipe?: Recipe | null;
  isLoading?: boolean;
}

export interface RecipeFormData {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  mealType: string[];
  image: string;
}

export default function RecipeModal({ isOpen, onClose, onSubmit, recipe, isLoading }: RecipeModalProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: '',
    ingredients: [''],
    instructions: [''],
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 1,
    difficulty: 'Easy',
    cuisine: '',
    caloriesPerServing: 0,
    tags: [],
    mealType: [],
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
  });

  const [tagsInput, setTagsInput] = useState('');
  const [mealTypeInput, setMealTypeInput] = useState('');

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prepTimeMinutes: recipe.prepTimeMinutes,
        cookTimeMinutes: recipe.cookTimeMinutes,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        caloriesPerServing: recipe.caloriesPerServing,
        tags: recipe.tags,
        mealType: recipe.mealType,
        image: recipe.image,
      });
      setTagsInput(recipe.tags.join(', '));
      setMealTypeInput(recipe.mealType.join(', '));
    } else {
      setFormData({
        name: '',
        ingredients: [''],
        instructions: [''],
        prepTimeMinutes: 0,
        cookTimeMinutes: 0,
        servings: 1,
        difficulty: 'Easy',
        cuisine: '',
        caloriesPerServing: 0,
        tags: [],
        mealType: [],
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      });
      setTagsInput('');
      setMealTypeInput('');
    }
  }, [recipe]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
    const mealType = mealTypeInput.split(',').map(t => t.trim()).filter(t => t);
    onSubmit({ ...formData, tags, mealType });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ''] });
  };

  const removeInstruction = (index: number) => {
    setFormData({
      ...formData,
      instructions: formData.instructions.filter((_, i) => i !== index),
    });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {recipe ? 'Edit Recipe' : 'Create New Recipe'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
              <input
                type="text"
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time (min)</label>
              <input
                type="number"
                value={formData.prepTimeMinutes}
                onChange={(e) => setFormData({ ...formData, prepTimeMinutes: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time (min)</label>
              <input
                type="number"
                value={formData.cookTimeMinutes}
                onChange={(e) => setFormData({ ...formData, cookTimeMinutes: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Calories per Serving</label>
            <input
              type="number"
              value={formData.caloriesPerServing}
              onChange={(e) => setFormData({ ...formData, caloriesPerServing: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition"
            >
              Add Ingredient
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={2}
                  required
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="mt-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition"
            >
              Add Instruction
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g. Healthy, Quick, Vegetarian"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type (comma-separated)</label>
            <input
              type="text"
              value={mealTypeInput}
              onChange={(e) => setMealTypeInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g. Breakfast, Lunch, Dinner"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : recipe ? 'Update Recipe' : 'Create Recipe'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
