'use client'

import { useEffect, useState } from 'react'

// ? Store
import StoreProvider from '@/app/StoreProvider'

// ? Dictionary
import { LanguageContextProvider } from '@/context/LanguageContext'

// ? Components
import { Alert, PageLoading } from '@/components'

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
