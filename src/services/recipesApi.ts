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
      async onQueryStarted(recipe, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          recipesApi.util.updateQueryData('getRecipes', { limit: 50 }, (draft) => {
            const newRecipe = {
              id: Math.floor(Math.random() * 10000) + 100,
              ...recipe,
              userId: 1,
              rating: 0,
              reviewCount: 0,
              mealType: recipe.mealType || [],
            } as Recipe;
            draft.recipes.unshift(newRecipe);
            draft.total += 1;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

    }),
    updateRecipe: builder.mutation<Recipe, Partial<Recipe> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/recipes/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          recipesApi.util.updateQueryData('getRecipes', { limit: 50 }, (draft) => {
            const recipe = draft.recipes.find((r) => r.id === id);
            if (recipe) {
              Object.assign(recipe, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

    }),
    deleteRecipe: builder.mutation<{ isDeleted: boolean; deletedOn: string }, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          recipesApi.util.updateQueryData('getRecipes', { limit: 50 }, (draft) => {
            draft.recipes = draft.recipes.filter((r) => r.id !== id);
            draft.total = Math.max(0, draft.total - 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

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
