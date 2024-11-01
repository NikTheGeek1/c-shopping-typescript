import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { existItem, getTotal } from '@/utils'

interface CartItem {
  name: string;
  itemID: string;
  productID: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  discount: number;
  inStock: number;
  sold: number;
  img: { url: string }
}

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
  tempSize: Size | null;
  tempColor: Color | null;
}

interface Size {
  id: string
  size: string
}

interface Color {
  id: string
  name: string
  hashCode: string
}

const getCartItems = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const cartItemsJSON = localStorage.getItem('cartItems')
    if (cartItemsJSON) return JSON.parse(cartItemsJSON)
  }
  return []
}

const setCartItems = (cartItems: CartItem[]) => localStorage.setItem('cartItems', JSON.stringify(cartItems))

const initialState: CartState = {
  cartItems: getCartItems(),
  totalItems: getTotal(getCartItems(), 'quantity'),
  totalPrice: getTotal(getCartItems(), 'price'),
  totalDiscount: getTotal(getCartItems(), 'discount'),
  tempSize: null,
  tempColor: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'itemID'>>) => {
      const { color, size, productID } = action.payload

      let isItemExist = existItem(state.cartItems, productID, color, size)

      if (isItemExist) {
        isItemExist.quantity += 1
      } else {
        state.cartItems.push({ itemID: nanoid(), ...action.payload, quantity: 1 })
      }
      state.totalItems = getTotal(state.cartItems, 'quantity')
      state.totalPrice = getTotal(state.cartItems, 'price')
      state.totalDiscount = getTotal(state.cartItems, 'discount')
      setCartItems(state.cartItems)
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cartItems.findIndex(item => item.itemID === action.payload)

      if (index !== -1) {
        state.cartItems.splice(index, 1)
        state.totalItems = getTotal(state.cartItems, 'quantity')
        state.totalPrice = getTotal(state.cartItems, 'price')
        state.totalDiscount = getTotal(state.cartItems, 'discount')
        setCartItems(state.cartItems)
      }
    },

    increase: (state, action: PayloadAction<string>) => {
      state.cartItems.forEach(item => {
        if (item.itemID === action.payload) item.quantity += 1
      })
      state.totalItems = getTotal(state.cartItems, 'quantity')
      state.totalPrice = getTotal(state.cartItems, 'price')
      state.totalDiscount = getTotal(state.cartItems, 'discount')
      setCartItems(state.cartItems)
    },

    decrease: (state, action: PayloadAction<string>) => {
      state.cartItems.forEach(item => {
        if (item.itemID === action.payload) item.quantity -= 1
      })
      state.totalItems = getTotal(state.cartItems, 'quantity')
      state.totalPrice = getTotal(state.cartItems, 'price')
      state.totalDiscount = getTotal(state.cartItems, 'discount')
      setCartItems(state.cartItems)
    },

    clearCart: state => {
      state.cartItems = []
      state.totalItems = 0
      state.totalPrice = 0
      state.totalDiscount = 0
      localStorage.removeItem('cartItems')
    },

    setTempColor: (state, action: PayloadAction<Color>) => {
      state.tempColor = action.payload
    },

    setTempSize: (state, action: PayloadAction<Size>) => {
      state.tempSize = action.payload
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decrease,
  increase,
  setTempColor,
  setTempSize,
} = cartSlice.actions

export default cartSlice.reducer
