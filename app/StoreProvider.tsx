'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'

interface StoreProviderProps {
  children: React.ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
