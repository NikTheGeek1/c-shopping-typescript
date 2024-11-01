'use client'

import { HandleResponse, LoginBtn, Logo, RedirectToLogin, TextField } from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'
import { useCreateUserMutation } from '@/store/services'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerSchema } from '@/utils'

import { TextField, LoginBtn, HandleResponse, RedirectToLogin, Logo } from '@/components'

import { useCreateUserMutation } from '@/store/services'
import { useDispatch } from 'react-redux'
import { userLogin } from '@/store'

import { useDisclosure } from '@/hooks'

import { useLanguageContext } from '@/context/LanguageContext'

export default function RegisterPage() {
  //? Assets
  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()
  const dispatch = useDispatch()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Create User
  const [createUser, { data, isSuccess, isError, isLoading, error }] = useCreateUserMutation()

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('name')
  }, [])

  //? Handlers
  const submitHander = async ({ name, email, password }) => {
    if (name && email && password) {
      await createUser({
        body: { name, email, password },
      })
    }
  }

  const onError = () => {
    if (error.status === 422) {
      redirectModalHandlers.open()
    }
  }

  const onSuccess = () => {
    dispatch(userLogin(data.data.token))
    reset()
    replace(redirectTo || '/')
  }

  return (
    <>
      <RedirectToLogin
        title={dict.signup?.error}
        text={error?.data?.message}
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
      {/* Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
      <main className="grid items-center min-h-screen">
        <section className="container max-w-md px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
          <Link passHref href="/">
            <Logo className="mx-auto w-48 h-24" />
          </Link>
          <h1>
            <font className="">
              <font>{dict?.signup?.register}</font>
            </font>
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(submitHander)} autoComplete="off">
            <TextField
              errors={formErrors.name}
              placeholder={dict?.signup?.name}
              name="name"
              control={control}
            />
            <TextField
              errors={formErrors.email}
              placeholder={dict?.signup?.email}
              name="email"
              control={control}
            />

            <TextField
              errors={formErrors.password}
              type="password"
              placeholder={dict?.signup?.password}
              name="password"
              control={control}
            />
            <TextField
              control={control}
              errors={formErrors.confirmPassword}
              type="password"
              placeholder={dict?.signup?.confirm}
              name="confirmPassword"
            />
            <LoginBtn isLoading={isLoading}>{dict?.signup?.register}</LoginBtn>
          </form>
          <div className="text-xs">
            <p className="inline mr-2 text-gray-800 text-xs">{dict?.signup?.account}</p>
            <Link href="/login" className="text-blue-400 text-xs">
              {dict?.signup?.goto}
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
