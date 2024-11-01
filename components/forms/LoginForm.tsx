'use client'

import { LoginBtn, TextField } from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'
//@ts-ignore
import { yupResolver } from '@hookform/resolvers/yup'
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

  // ? Dictionary
  const { dict } = useLanguageContext()

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <TextField
        errors={formErrors.email}
        placeholder={dict.login?.email}
        name="email"
        control={control}
      />

      <TextField
        errors={formErrors.password}
        type="password"
        placeholder={dict.login?.password}
        name="password"
        control={control}
      />
      <LoginBtn isLoading={isLoading}>{dict.login?.login}</LoginBtn>
    </form>
  )
}

export default LoginForm
