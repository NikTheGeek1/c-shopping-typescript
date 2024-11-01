'use client'

import Image from 'next/image'

import { Button, ControlledCheckbox, TextField, UploadImage } from '@/components'

import { useForm } from 'react-hook-form'
//@ts-ignore
import { yupResolver } from '@hookform/resolvers/yup';

import { bannerSchema } from '@/utils'

import { useEffect } from 'react'
import { useLanguageContext } from '@/context/LanguageContext'

interface BannerFormProps {
  mode: 'create' | 'edit'
  createHandler?: (data: any) => void
  updateHandler?: (data: any) => void
  deleteHandler?: () => void
  isLoadingCreate?: boolean
  isLoadingDelete?: boolean
  isLoadingUpdate?: boolean
  selectedBanner?: any
}

const BannerForm = ({ mode, createHandler, updateHandler, deleteHandler, isLoadingCreate, isLoadingDelete, isLoadingUpdate, selectedBanner }: BannerFormProps) => {

  //? Assets
  const defaultValues = {
    image: { url: '' },
    title: '',
    uri: '',
    isPublic: true,
    type: 'one',
  }

  //? Hook Form
  const {
    control,
    getValues,
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(bannerSchema),
  })

  //? Handlers
  const handleAddUploadedImageUrl = (url: string) => setValue('image.url', url)

  //? Re-Renders
  useEffect(() => {
    if (selectedBanner && mode === 'edit') {
      const { image, title, uri, isPublic, type } = selectedBanner

      reset({ image, title, uri, isPublic, type })
    }
  }, [selectedBanner])

  // ? Dictionary
  const { dict } = useLanguageContext()

  return (
    <section className="p-3 mx-auto mb-10 space-y-8">
      <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
        <form
          onSubmit={mode === 'create' ? handleSubmit(createHandler || (() => {} )) : handleSubmit(updateHandler || (() => {}))}
          className="space-y-3"
        >
          <TextField
            label={dict.admin?.banner.titleTH}
            control={control}
            name="title"
            errors={formErrors?.title}
          />

          <TextField
            label={dict.admin?.banner.link}
            control={control}
            name="uri"
            errors={formErrors?.uri}
          />

          <div className="w-44 my-3">
            <ControlledCheckbox
              name="isPublic"
              control={control}
              label={dict.admin?.banner.status}
            />
          </div>

          <div className="flex items-center gap-8 mb-5">
            <label className="inline-flex items-center gap-x-2">
              <input
                className="w-5 h-5 text-red-600"
                type="radio"
                value="one"
                {...register('type')}
              />
              <span className="ml-2 text-gray-700">{dict.admin?.banner.typeOne}</span>
            </label>

            <label className="inline-flex items-center gap-x-2">
              <input
                className="w-5 h-5 text-red-600"
                type="radio"
                value="two"
                {...register('type')}
              />
              <span className="ml-2 text-gray-700">{dict.admin?.banner.typeTwo}</span>
            </label>
          </div>

          <TextField
            label={dict.admin?.banner.url}
            control={control}
            name="image.url"
            errors={formErrors?.image?.url}
          />

          <UploadImage folder="/banners" handleAddUploadedImageUrl={handleAddUploadedImageUrl} />

          {bannerSchema.isValidSync(watch()) && (
            <div className="mx-auto max-w-max">
              {getValues('image.url') && (
                <Image
                  src={getValues('image.url')}
                  width={getValues('type') === 'one' ? 400 : 300}
                  height={200}
                  alt="banner image"
                />
              )}
            </div>
          )}

          <div className="flex justify-evenly gap-x-4 pt-10">
            {mode === 'edit' ? (
              <>
                <Button
                  className="bg-amber-500 "
                  isRounded={true}
                  type="submit"
                  isLoading={isLoadingUpdate}
                >
                  {dict.admin?.banner.update}
                </Button>

                <Button isRounded={true} isLoading={isLoadingDelete} onClick={deleteHandler}>
                  {dict.admin?.banner.delete}
                </Button>
              </>
            ) : (
              <Button
                className="bg-green-500 "
                isRounded={true}
                type="submit"
                isLoading={isLoadingCreate}
              >
                {dict.admin?.banner.submit}
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default BannerForm
