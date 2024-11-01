import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '@/store'

interface UserState {
  token: string | null
}

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers: Headers, { getState }: { getState: () => RootState }) => {
      const token = (getState().user as UserState).token
      if (token) headers.set('authorization', token)
      return headers
    },
  }),
  tagTypes: ['User', 'Review', 'Details', 'Order', 'Product', 'Category', 'Slider', 'Banner'],
  endpoints: (builder) => ({}),
})

export default apiSlice
