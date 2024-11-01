'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle } from '@/hooks'
import { useCreateProductMutation } from '@/store/services'
import { HandleResponse, PageContainer, ProductsForm } from '@/components'
import { useRouter } from 'next/navigation'

const CreateProductPage = () => {
  // ? Dictionary
  const { dict } = useLanguageContext()

  useTitle(dict.admin ? dict.admin?.create.title : 'Create Product')
  //? Assets
  const { push } = useRouter()

  //? Queries
  //*   Create Product
  const [createProduct, { data, isSuccess, isLoading, isError, error }] = useCreateProductMutation()

  //? Handlers
  const createHandler = data => {
    console.log(data)
    createProduct({ body: data })
  }

  const onSuccess = () => {
    push('/admin/products')
  }

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
        <PageContainer title={dict.admin?.create.title}>
          <ProductsForm mode="create" isLoadingCreate={isLoading} createHandler={createHandler} />
        </PageContainer>
      </main>
    </>
  )
}

export default CreateProductPage
