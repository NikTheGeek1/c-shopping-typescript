import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

//? Reducers
import userReducer from './slices/user.slice'
import alertReducer from './slices/alert.slice'
import filtersReducer from './slices/filters.slice'
import cartReducer from './slices/cart.slice'
import apiSlice from './services/api'
import { Store } from '@reduxjs/toolkit'

//? Actions
export * from './slices/user.slice'
export * from './slices/alert.slice'
export * from './slices/filters.slice'
export * from './slices/cart.slice'

export const store: Store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    cart: cartReducer,
    filters: filtersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
