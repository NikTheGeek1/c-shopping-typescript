import apiSlice from './api';

export type Review = {
  _id: string;
  productId: string;

  id: number
  title: string
  comment: string
  rating: number
  updatedAt: string
  user: {
    name: string
  }
  positivePoints: {
    id: number
    title: string
  }[]
  negativePoints: {
    id: number
    title: string
  }[]


  status: number
  product: {
    images: {
      url: string
    }[]
  }
};

type ReviewsListResponse = {
  data: {
    reviews: Review[];
    total: number;
    reviewsLength: number;
    pagination: {
      currentPage: number
      nextPage: number
      previousPage: number
      hasNextPage: boolean
      hasPreviousPage: boolean
      lastPage: number
    };
  };
};

type SingleReviewResponse = {
  data: Review;
};

type CreateUpdateReviewBody = {
  productId?: string;
  rating?: number;
  comment?: string;
  status?: number;
};

type GetReviewsQueryArgs = {
  page?: number;
};

type GetProductReviewsQueryArgs = {
  id: string;
  page?: number;
};

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsList: builder.query<ReviewsListResponse, GetReviewsQueryArgs>({
      query: ({ page }) => ({
        url: `/api/reviews/list?page=${page}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.reviews.map(({ _id }) => ({
              type: 'Review' as const,
              id: _id,
            })),
            { type: 'Review' as const },
          ]
          : [{ type: 'Review' as const }],
    }),

    getReviews: builder.query<ReviewsListResponse, GetReviewsQueryArgs>({
      query: ({ page }) => ({
        url: `/api/reviews?page=${page}`,
        method: 'GET',
      }),
    }),

    createReview: builder.mutation<void, { body: CreateUpdateReviewBody }>({
      query: ({ body }) => ({
        url: `/api/reviews`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Review' as const }],
    }),

    getProductReviews: builder.query<ReviewsListResponse, GetProductReviewsQueryArgs>({
      query: ({ id, page }) => ({
        url: `/api/reviews/product/${id}?page=${page}&page_size=5`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.reviews.map(({ _id }) => ({
              type: 'Review' as const,
              id: _id,
            })),
            { type: 'Review' as const },
          ]
          : [{ type: 'Review' as const }],
    }),

    getSingleReview: builder.query<SingleReviewResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/api/reviews/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Review', id: arg.id }],
    }),

    deleteReview: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/api/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Review' as const }],
    }),

    editReview: builder.mutation<void, { id: string; body: CreateUpdateReviewBody }>({
      query: ({ id, body }) => ({
        url: `/api/reviews/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Review', id: arg.id }],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetSingleReviewQuery,
  useDeleteReviewMutation,
  useGetProductReviewsQuery,
  useEditReviewMutation,
  useCreateReviewMutation,
  useGetReviewsListQuery,
} = reviewApiSlice;