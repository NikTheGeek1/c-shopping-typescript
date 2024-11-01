import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface LastSeenItem {
  productID: string;
  image: string;
  title: string;
}

interface UserState {
  token: string;
  lastSeen: LastSeenItem[];
}

const getLastSeen = (): LastSeenItem[] => {
  if (typeof window !== 'undefined') {
    const lastSeenJSON = localStorage.getItem('lastSeen');
    if (lastSeenJSON) return JSON.parse(lastSeenJSON) as LastSeenItem[];
  }
  return [];
};

const token = Cookies.get('token') || '';

const initialState: UserState = {
  token,
  lastSeen: getLastSeen(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      Cookies.remove('token');
      state.token = '';
    },

    userLogin: (state, action: PayloadAction<string>) => {
      Cookies.set('token', action.payload, { expires: 10 });
      state.token = action.payload;
    },

    addToLastSeen: (state, action: PayloadAction<LastSeenItem>) => {
      const isItemExist = state.lastSeen.find(
        (item) => item.productID === action.payload.productID
      );

      if (!isItemExist) {
        if (state.lastSeen.length === 15) {
          state.lastSeen.splice(14, 1);
        }
        state.lastSeen.unshift(action.payload);
        localStorage.setItem('lastSeen', JSON.stringify(state.lastSeen));
      }
    },
  },
});

export const { userLogout, userLogin, addToLastSeen } = userSlice.actions;

export default userSlice.reducer;