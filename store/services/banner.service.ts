import apiSlice from './api';

interface Banner {
  _id: string;
  // Add other banner properties here
}

interface GetBannersResponse {
  data: Banner[];
}

interface GetSingleBannerResponse {
  data: Banner;
}

interface UpdateBannerBody {
  // Define the structure of the update body here
}

interface CreateBannerBody {
  // Define the structure of the create body here
}

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<GetBannersResponse, { category: string }>({
      query: ({ category }) => ({
        url: `/api/banner?category=${category}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Banner' as const,
                id: _id,
              })),
              'Banner',
            ]
          : ['Banner'],
    }),

    getSingleBanner: builder.query<GetSingleBannerResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/api/banner/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Banner', id: arg.id }],
    }),

    updateBanner: builder.mutation<void, { id: string; body: UpdateBannerBody }>({
      query: ({ id, body }) => ({
        url: `/api/banner/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Banner', id: arg.id }],
    }),

    createBanner: builder.mutation<void, { body: CreateBannerBody }>({
      query: ({ body }) => ({
        url: '/api/banner',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Banner'],
    }),

    deleteBanner: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/api/banner/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
  }),
});

export const {
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetBannersQuery,
} = bannerApiSlice;
