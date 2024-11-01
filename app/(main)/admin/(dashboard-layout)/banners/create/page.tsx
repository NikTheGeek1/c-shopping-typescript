'use client'

import { useRouter } from 'next/navigation'

import { BannerForm, HandleResponse, PageContainer } from '@/components'

import { SubmitHandler } from 'react-hook-form'

import { useCreateBannerMutation } from '@/store/services'
import { useTitle, useUrlQuery } from '@/hooks'

interface BannerFormData {
  image: string
  isPublic: boolean
  title: string
  type: string
  uri: string
}

const CreateBannerPage: React.FC = () => {
  useTitle('Create Banner')
  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const categoryId = query?.category_id

  //? Queries
  //*     Create Banner
  const [createBanner, { data, isSuccess, isLoading, error, isError }] = useCreateBannerMutation()

  //? Handlers
  const createHandler: SubmitHandler<BannerFormData> = data => {
    const { image, isPublic, title, type, uri } = data
    createBanner({
      body: { category_id: categoryId, image, isPublic, title, type, uri },
    })
  }

  const onSuccess = () => back()

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={(error as any)?.data?.message}
          message={(data as any)?.message}
          onSuccess={onSuccess}
        />
      )}

      <main>
        <PageContainer title="Add Banner">
          <BannerForm mode="create" isLoadingCreate={isLoading} createHandler={createHandler} />
        </PageContainer>
      </main>
    </>
  )
}

export default CreateBannerPage
