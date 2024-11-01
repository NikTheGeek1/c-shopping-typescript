'use client'

import { useEffect } from 'react'

import { showAlert } from '@/store'
import { useDispatch } from 'react-redux'

interface HandleResponseProps {
  isSuccess: boolean
  isError: boolean
  error: string
  message: string
  onSuccess?: () => void
  onError?: () => void
}

export default function HandleResponse({ isSuccess, isError, error, message, onSuccess, onError }: HandleResponseProps) {

  //? Assets
  const dispatch = useDispatch()

  //? Re-Renders
  useEffect(() => {
    if (isSuccess) {
      if (onSuccess) onSuccess()

      dispatch(
        showAlert({
          status: 'success',
          title: message,
        })
      )
    }

    if (isError) {
      if (onError) onError()

      dispatch(
        showAlert({
          status: 'error',
          title: error,
        })
      )
    }
  }, [])

  return null
}
