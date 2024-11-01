import apiSlice from './api';

type UploadTokenResponse = {
  token: string;
  expiresIn: number; // Adjust according to the actual API response
};

export const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUploadToken: builder.query<UploadTokenResponse, void>({
      query: () => ({
        url: `/api/upload/getToken`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUploadTokenQuery,
  useLazyGetUploadTokenQuery,
} = commonApiSlice;