import apiSlice from './api';
import { Category } from '@/types'; // Assuming you have a Category type defined somewhere

type CategoryResponse = {
  data: {
    categories: Category[];
  };
};

type SingleCategoryResponse = {
  data: Category;
};

type UpdateCategoryBody = {
  name: string;
  description: string;
};

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse, void>({
      query: () => ({
        url: '/api/category',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.categories.map(({ _id }) => ({
                type: 'Category' as const,
                id: _id,
              })),
              { type: 'Category' as const },
            ]
          : [{ type: 'Category' as const }],
    }),

    getSingleCategory: builder.query<SingleCategoryResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Category', id: arg.id }],
    }),

    updateCategory: builder.mutation<void, { id: string; body: UpdateCategoryBody }>({
      query: ({ id, body }) => ({
        url: `/api/category/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Category', id: arg.id }],
    }),

    createCategory: builder.mutation<void, { body: UpdateCategoryBody }>({
      query: ({ body }) => ({
        url: '/api/category',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category' as const }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice;