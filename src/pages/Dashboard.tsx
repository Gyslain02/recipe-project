import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  Recipe,
} from '@/services/recipesApi';
import { useGetUserProfileQuery } from '@/services/authApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/authSlice';
import RecipeModal, { RecipeFormData } from '@/components/RecipeModal';
import { Plus, LogOut, User, Edit, Trash2, Clock, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const { data: profile } = useGetUserProfileQuery();
  const { data: recipesData, isLoading } = useGetRecipesQuery({ limit: 50 });
  const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleCreateRecipe = async (data: RecipeFormData) => {
    try {
      await createRecipe(data).unwrap();
      toast.success('Recipe created successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create recipe:', error);
      toast.error('Failed to create recipe');
    }
  };

  const handleUpdateRecipe = async (data: RecipeFormData) => {
    if (!editingRecipe) return;
    try {
      await updateRecipe({ id: editingRecipe.id, ...data }).unwrap();
      toast.success('Recipe updated successfully');
      setEditingRecipe(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update recipe:', error);
      toast.error('Failed to update recipe');
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(id).unwrap();
        toast.success('Recipe deleted successfully');
      } catch (error) {
        console.error('Failed to delete recipe:', error);
        toast.error('Failed to delete recipe');
      }
    }
  };

  const openCreateModal = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const openEditModal = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Recipe Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Manage your recipe collection</p>
            </div>

            <div className="flex items-center gap-4">
              {profile && (
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-left"
                >
                  <img
                    src={profile.image || user?.image}
                    alt={profile.firstName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{profile.email}</p>
                  </div>
                </button>
              )}

              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Home
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Recipes</h2>
            <p className="text-gray-600 text-sm">
              {recipesData ? `${recipesData.total} recipes found` : 'Loading...'}
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Recipe
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
          </div>
        ) : recipesData && recipesData.recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipesData.recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md font-medium">
                      {recipe.cuisine}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
                      {recipe.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(recipe)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRecipe(recipe.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-xl text-gray-600 mb-4">No recipes yet</p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition"
            >
              <Plus className="w-5 h-5" />
              Create Your First Recipe
            </button>
          </div>
        )}
      </main>

      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRecipe(null);
        }}
        onSubmit={editingRecipe ? handleUpdateRecipe : handleCreateRecipe}
        recipe={editingRecipe}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
}
