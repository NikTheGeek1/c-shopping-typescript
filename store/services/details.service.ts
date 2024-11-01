import apiSlice from './api';

type Details = {
  id: string;
  name: string;
  description: string;
  // Add more fields based on the API response structure
};

type CreateUpdateDetailsBody = {
  name: string;
  description: string;
  // Add other fields relevant to creating/updating details
};

type GetDetailsResponse = {
  category_id: string; // Adjust this based on your response, especially if category_id is actually present in the result
  details: Details;
};

export const detailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query<GetDetailsResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Details', id: arg.id }],
    }),

    deleteDetails: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Details' as const }],
    }),

    createDetails: builder.mutation<void, { body: CreateUpdateDetailsBody }>({
      query: ({ body }) => ({
        url: '/api/details',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Details' as const }],
    }),

    updateDetails: builder.mutation<any, { id: string; body: CreateUpdateDetailsBody }>({
      query: ({ id, body }) => ({
        url: `/api/details/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Details', id: result?.category_id }],
    }),
  }),
});

export const {
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useCreateDetailsMutation,
  useUpdateDetailsMutation,
} = detailsApiSlice;