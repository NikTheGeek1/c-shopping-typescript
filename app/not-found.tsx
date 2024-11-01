'use client'

export const metadata = {
  title: '404 Not Found!',
}

import { ArrowLink, ClientLayout, ResponsiveImage } from '@/components'
import StoreProvider from '@/app/StoreProvider'
import { useEffect, useState } from 'react'

export default function NotFoundPage() {
  const [notFound, setNotFound] = useState('Go back to homepage')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lng = window.localStorage?.getItem('lng')
      if (lng === 'en') {
        setNotFound('Go back to homepage')
      }
    }
  }, [])

  //? Render(s)
  return (
    <StoreProvider>
      <ClientLayout>
        <main className="flex flex-col items-center justify-center py-8 gap-y-6 xl:mt-28">
          <p className="text-base font-semibold text-black">404 Not Found!</p>
          <ArrowLink path="/">{notFound}</ArrowLink>
          <ResponsiveImage
            dimensions="w-full max-w-lg h-72"
            src="/icons/page-not-found.png"
            layout="fill"
            alt="404"
          />
        </main>
      </ClientLayout>
    </StoreProvider>
  )
}
