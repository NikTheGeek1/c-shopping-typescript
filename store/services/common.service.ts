import apiSlice from './api';

type UploadTokenResponse = {
  token: string;
  expiresIn: number; // Adjust according to the actual API response
};

export type ConvertImageResponse = {
  // Define the response type according to the actual API response
  data: ArrayBuffer;
};

type ConvertImageRequest = {
  // Define the request type according to the actual API request
  file: File;
};

export const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUploadToken: builder.query<UploadTokenResponse, void>({
      query: () => ({
        url: `/api/upload/getToken`,
        method: 'GET',
      }),
    }),
    convertImage: builder.mutation<ConvertImageResponse, ConvertImageRequest>({
      query: (body) => {
        // Create FormData and append the file data
        const formData = new FormData();
        formData.append('file', body.file); // Ensure `body.file` is a `File` or `Blob`

        return ({
          url: `/api/upload/convertImage`,
          method: 'POST',
          body: formData,
        })
      },
    }),
  }),
});

export const {
  useGetUploadTokenQuery,
  useLazyGetUploadTokenQuery,
  useConvertImageMutation,
} = commonApiSlice;