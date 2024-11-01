'use client'

import { useEffect, useState } from 'react'

// ? Store
import StoreProvider from '@/app/StoreProvider'

// ? Conponents
import { PageLoading, Alert } from '@/components'
import { LanguageContextProvider } from '@/context/LanguageContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  //? Fix Hydration failed
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <StoreProvider>
      <LanguageContextProvider>{children}</LanguageContextProvider>
      <Alert />
      <PageLoading />
    </StoreProvider>
  )
}
