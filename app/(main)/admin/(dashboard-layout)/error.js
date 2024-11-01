'use client' // Error components must be Client Components

import { Button } from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  // ? Dictionary
  const { dict } = useLanguageContext()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <div className="py-20 mx-auto space-y-3 text-center w-fit">
        <h5 className="text-xl">{error.name}</h5>
        <p className="text-lg text-red-500">{error.message}</p>
        <Button
          className="mx-auto"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          {dict.wrapper?.retry}
        </Button>
      </div>
    </>
  )
}
