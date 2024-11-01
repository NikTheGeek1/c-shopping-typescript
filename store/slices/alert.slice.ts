import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AlertState {
  title: string
  status: string
  isShow: boolean
}

const initialState: AlertState = { title: '', status: '', isShow: false }

interface ShowAlertPayload {
  title: string
  status: string
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<ShowAlertPayload>) => {
      state.isShow = true
      state.title = action.payload.title
      state.status = action.payload.status
    },
    removeAlert: state => {
      state.isShow = false
      state.status = ''
      state.title = ''
    },
  },
})

export const { showAlert, removeAlert } = alertSlice.actions

export default alertSlice.reducer
