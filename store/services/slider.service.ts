import apiSlice from './api';

type Slider = {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  // Add other relevant fields based on your slider structure
};

type GetSingleSliderResponse = {
  data: Slider;
};

type GetSlidersResponse = {
  data: Slider[];
};

type CreateUpdateSliderBody = {
  title: string;
  imageUrl: string;
  category: string;
  // Add other relevant fields for creating/updating sliders
};

export const sliderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleSlider: builder.query<GetSingleSliderResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/api/slider/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Slider', id: arg.id }],
    }),

    getSliders: builder.query<GetSlidersResponse, { category?: string }>({
      query: ({ category }) => ({
        url: `/api/slider?category=${category}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Slider' as const,
                id: _id,
              })),
              { type: 'Slider' as const },
            ]
          : [{ type: 'Slider' as const }],
    }),

    updateSlider: builder.mutation<void, { id: string; body: CreateUpdateSliderBody }>({
      query: ({ id, body }) => ({
        url: `/api/slider/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Slider', id: arg.id }],
    }),

    createSlider: builder.mutation<void, { body: CreateUpdateSliderBody }>({
      query: ({ body }) => ({
        url: '/api/slider',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Slider' as const }],
    }),

    deleteSlider: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/api/slider/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Slider' as const }],
    }),
  }),
});

export const {
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
  useCreateSliderMutation,
  useDeleteSliderMutation,
  useGetSlidersQuery,
} = sliderApiSlice;