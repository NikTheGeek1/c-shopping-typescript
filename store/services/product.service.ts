import apiSlice from './api';

type Product = {
  _id: string;
  name: string;
  price: number;
  inStock: number;
  discount: number;
  images: { url: string }[];
  title: string;
  rating: number;
};

type ProductsListResponse = {
  data: {
    products: Product[];
    total: number;
    productsLength: number;
    mainMaxPrice: number;
    mainMinPrice: number;
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

type SingleProductResponse = {
  data: Product;
};

type CreateUpdateProductBody = {
  name: string;
  price: number;
  inStock: boolean;
  discount: number;
  // Add other fields necessary for creating/updating a product
};

type GetProductsQueryArgs = {
  category?: string;
  page_size?: number;
  page?: number;
  sort?: string;
  search?: string;
  inStock?: boolean;
  discount?: number;
  price?: number;
};

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsListResponse, GetProductsQueryArgs>({
      query: ({ category, page_size, page, sort, search, inStock, discount, price }) => {
        const queryParams = new URLSearchParams();

        Object.entries({
          category,
          page_size,
          page,
          sort,
          search,
          inStock,
          discount,
          price,
        }).forEach(([key, value]) => {
          if (value !== undefined && value !== null) queryParams.set(key, value.toString());
        });

        return {
          url: `/api/products?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result
          ? [
            ...result.data.products.map(({ _id }) => ({
              type: 'Product' as const,
              id: _id,
            })),
            { type: 'Product' as const },
          ]
          : [{ type: 'Product' as const }],
    }),

    getSingleProduct: builder.query<SingleProductResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }],
    }),

    deleteProduct: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product' as const }],
    }),

    createProduct: builder.mutation<void, { body: CreateUpdateProductBody }>({
      query: ({ body }) => ({
        url: `/api/products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product' as const }],
    }),

    updateProduct: builder.mutation<void, { id: string; body: CreateUpdateProductBody }>({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }],
    }),
  }),
});

export const {
  useDeleteProductMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} = productApiSlice;