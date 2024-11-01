import { UserAddress } from '@/types';
import apiSlice from './api';

type Order = {
  _id: string;
  product: string;
  quantity: number;
  status: string;
  delivered: boolean;
};

type OrdersListResponse = {
  data: {
    orders: Order[];
    total: number;
  };
};

type SingleOrderResponse = {
  data: Order;
};

type CreateUpdateOrderBody = Partial<{
  product: string;
  quantity: number;
  status: string;
  paid: boolean;
  delivered: boolean;
  address: {
    city: string;
    area: string;
    province: string;
    street: string;
    postalCode: string;
  }
  mobile: string;
  cart: string[];
  cartItems: number;
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
  paymentMethod: string;
}>;

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersList: builder.query<OrdersListResponse, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `/api/order/list?page=${page}&page_size=${pageSize}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.orders.map(({ _id }) => ({
              type: 'Order' as const,
              id: _id,
            })),
            { type: 'Order' as const },
          ]
          : [{ type: 'Order' as const }],
    }),

    getOrders: builder.query<OrdersListResponse, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `/api/order?page=${page}&page_size=${pageSize}`,
        method: 'GET',
      }),
    }),

    getSingleOrder: builder.query<SingleOrderResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/api/order/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg.id }],
    }),

    updateOrder: builder.mutation<void, { id: string; body: CreateUpdateOrderBody }>({
      query: ({ id, body }) => ({
        url: `/api/order/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.id }],
    }),

    createOrder: builder.mutation<void, { body: CreateUpdateOrderBody }>({
      query: ({ body }) => ({
        url: '/api/order',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Order' as const }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useCreateOrderMutation,
  useGetOrdersListQuery,
} = orderApiSlice;