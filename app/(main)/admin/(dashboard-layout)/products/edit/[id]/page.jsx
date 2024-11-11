'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle } from '@/hooks'
import { useGetSingleProductQuery, useUpdateProductMutation } from '@/store/services'
import {
  BigLoading,
  ConfirmUpdateModal,
  HandleResponse,
  PageContainer,
  ProductsForm,
} from '@/components'
import { useDisclosure } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const EditProductPage = ({ params: { id } }) => {
  // ? Dictionary
  const { dict } = useLanguageContext()

  useTitle(dict.admin ? dict.admin.products.title : 'Edit Product')

  //? Assets
  const { back } = useRouter()

  const initialUpdateInfo = {}

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState(initialUpdateInfo)

  //? Queries
  //*    Get Product
  const { data: selectedProduct, isLoading: isLoadingGetSelectedProduct } =
    useGetSingleProductQuery({ id })

  //*   Update Product
  const [
    updateProduct,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateProductMutation()

  //? Handlers
  const updateHandler = data => {
    setUpdateInfo(prev => ({ ...prev, ...selectedProduct.data, ...data }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateProduct({
      id,
      body: updateInfo,
    })
  }

  const onCancelUpdate = () => {
    setUpdateInfo(initialUpdateInfo)
    confirmUpdateModalHandlers.close()
  }

  const onSuccessUpdate = () => {
    setUpdateInfo(initialUpdateInfo)
    confirmUpdateModalHandlers.close()
    back()
  }

  const onErrorUpdate = () => {
    setUpdateInfo(initialUpdateInfo)
    confirmUpdateModalHandlers.close()
  }

  return (
    <>
      <ConfirmUpdateModal
        title={dict.admin.products.singular}
        isLoading={isLoadingUpdate}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onCancel={onCancelUpdate}
        onConfirm={onConfirmUpdate}
      />

      {(isSuccessUpdate || isErrorUpdate) && (
        <HandleResponse
          isError={isErrorUpdate}
          isSuccess={isSuccessUpdate}
          error={errorUpdate?.data?.message}
          message={dataUpdate?.message}
          onSuccess={onSuccessUpdate}
          onError={onErrorUpdate}
        />
      )}

      <main>
        <PageContainer title={dict.admin?.products.title}>
          {isLoadingGetSelectedProduct ? (
            <div className="px-3 py-20">
              <BigLoading />
            </div>
          ) : selectedProduct?.data ? (
            <ProductsForm
              mode="edit"
              isLoadingUpdate={isLoadingUpdate}
              updateHandler={updateHandler}
              selectedProduct={selectedProduct.data}
            />
          ) : null}
        </PageContainer>
      </main>
    </>
  )
}

export default EditProductPage
