'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoginBtn, TextField } from '@/components'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { logInSchema } from '@/utils'

interface LoginFormProps {
  isLoading: boolean
  onSubmit: (data: any) => void
}

const LoginForm = ({ isLoading, onSubmit }: LoginFormProps) => {

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setFocus,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: { email: '', password: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('email')
  }, [])

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <TextField
        errors={formErrors.email}
        placeholder="Please enter your account email"
        name="email"
        control={control}
      />

      <TextField
        errors={formErrors.password}
        type="password"
        placeholder="Please enter your account password"
        name="password"
        control={control}
      />
      <LoginBtn isLoading={isLoading}>Login</LoginBtn>
    </form>
  )
}

export default LoginForm
