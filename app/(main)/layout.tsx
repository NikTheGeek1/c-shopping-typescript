'use client'

import { useEffect, useState } from 'react'

// ? Store
import StoreProvider from '@/app/StoreProvider'

// ? Dictionary
import { LanguageContextProvider } from '@/context/LanguageContext'

// ? Components
import { Alert, PageLoading } from '@/components'
import { ThemeProvider } from '../ThemeProvider'

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
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <LanguageContextProvider>{children}</LanguageContextProvider>
        <Alert />
        <PageLoading />
      </ThemeProvider>
    </StoreProvider>
  )
}
