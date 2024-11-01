import { User } from '@/types';
import apiSlice from './api';

type GetUserResponse = {
  data: User;
};

type GetUsersResponse = {
  data: {
    users: User[];
    total: number;
  };
};

type LoginBody = {
  email: string;
  password: string;
};

type CreateUpdateUserBody = Partial<{
  _id?: string;
  name: string;
  email: string;
  password?: string; 
  mobile: string;
}>;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, { body: LoginBody }>({
      query: ({ body }) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        'User',
        'Review',
        'Details',
        'Order',
        'Product',
        'Category',
        'Slider',
        'Banner',
      ],
    }),

    getUserInfo: builder.query<GetUserResponse, void>({
      query: () => ({
        url: '/api/auth/user',
        method: 'GET',
      }),
      providesTags: [{ type: 'User' as const }],
    }),

    createUser: builder.mutation<void, { body: CreateUpdateUserBody }>({
      query: ({ body }) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        'User',
        'Review',
        'Details',
        'Order',
        'Product',
        'Category',
        'Slider',
        'Banner',
      ],
    }),

    getUsers: builder.query<GetUsersResponse, { page?: number }>({
      query: ({ page }) => ({
        url: `/api/user?page=${page}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.users.map(({ _id }) => ({
                type: 'User' as const,
                id: _id,
              })),
              { type: 'User' as const },
            ]
          : [{ type: 'User' as const }],
    }),

    editUser: builder.mutation<void, { body: CreateUpdateUserBody }>({
      query: ({ body }) => ({
        url: '/api/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'User', id: arg.body._id }],
    }),

    deleteUser: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/api/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User' as const }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} = userApiSlice;