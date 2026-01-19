import { api } from './api';

export interface Recipe {
  id: number;
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
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

interface RecipesQueryParams {
  limit?: number;
  skip?: number;
  q?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

interface CreateRecipeRequest {
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

export const recipesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipesResponse, RecipesQueryParams>({
      query: ({ limit = 10, skip = 0, q = '', sortBy = '', order = 'asc' }) => {
        let url = `/recipes?limit=${limit}&skip=${skip}`;
        if (q) {
          url = `/recipes/search?q=${q}&limit=${limit}&skip=${skip}`;
        }
        if (sortBy) {
          url += `&sortBy=${sortBy}&order=${order}`;
        }
        return url;
      },
      providesTags: (result) =>
        result
          ? [
            ...result.recipes.map(({ id }) => ({ type: 'Recipe' as const, id })),
            { type: 'Recipe', id: 'LIST' },
          ]
          : [{ type: 'Recipe', id: 'LIST' }],
    }),
    getRecipe: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Recipe', id }],
    }),
    createRecipe: builder.mutation<Recipe, CreateRecipeRequest>({
      query: (recipe) => ({
        url: '/recipes/add',
        method: 'POST',
        body: recipe,
      }),
      invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
    }),
    updateRecipe: builder.mutation<Recipe, Partial<Recipe> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/recipes/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Recipe', id }],
    }),
    deleteRecipe: builder.mutation<{ isDeleted: boolean; deletedOn: string }, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi;
