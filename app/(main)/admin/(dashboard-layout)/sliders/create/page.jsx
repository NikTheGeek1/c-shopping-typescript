'use client'
import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import { useCreateSliderMutation } from '@/store/services'
import { HandleResponse, PageContainer, SliderForm } from 'components'
import { useRouter } from 'next/navigation'

const CreateSliderPage = () => {
  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const categoryName = query?.category_name
  const categoryId = query?.category_id

  //? Queries
  //*     Create Slider
  const [createSlider, { data, isSuccess, isLoading, error, isError }] = useCreateSliderMutation()

  //? Handlers
  const createHandler = data => {
    const { image, isPublic, title, uri } = data
    createSlider({
      body: { category_id: categoryId, image, isPublic, title, uri },
    })
  }

  const onSuccess = () => back()

  // ? Dictionary
  const { dict } = useLanguageContext()

  useTitle(dict.admin?.slider.added + ' - ' + categoryName)

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}

      <main>
        <PageContainer title={dict.admin?.slider.added + ' - ' + categoryName}>
          <SliderForm mode="create" isLoadingCreate={isLoading} createHandler={createHandler} />
        </PageContainer>
      </main>
    </>
  )
}

export default CreateSliderPage
