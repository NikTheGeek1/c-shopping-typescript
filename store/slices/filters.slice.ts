import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FilterState {
  inStock: boolean;
  discount: boolean;
  maxPrice: number;
  minPrice: number;
}

const initialState: FilterState = {
  inStock: false,
  discount: false,
  maxPrice: 0,
  minPrice: 0,
};

interface UpdateFilterPayload {
  name: string;
  value: boolean | number;
}

interface ResetFilterPayload {
  maxPrice: number;
  minPrice: number;
}

interface LoadFiltersPayload {
  discount?: string;
  inStock?: string;
  price?: string;
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<UpdateFilterPayload>) => {
      const { name, value } = action.payload;
      // @ts-ignore
      state[name] = value;
    },
    resetFilter: (state, action: PayloadAction<ResetFilterPayload>) => {
      const { maxPrice, minPrice } = action.payload;
      Object.assign(state, initialState, { maxPrice, minPrice });
    },
    loadFilters: (state, action: PayloadAction<LoadFiltersPayload>) => {
      const { discount, inStock, price } = action.payload;
      if (discount !== undefined) {
        state.discount = discount === 'true';
      }
      if (inStock !== undefined) {
        state.inStock = inStock === 'true';
      }
      if (price) {
        const [min, max] = price.split('-').map(Number);
        state.minPrice = min;
        state.maxPrice = max;
      }
    },
  },
});

export const { updateFilter, resetFilter, loadFilters } = filterSlice.actions;

export default filterSlice.reducer;