'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import {
  useDeleteSliderMutation,
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
} from '@/store/services'
import {
  BigLoading,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  HandleResponse,
  PageContainer,
  SliderForm,
} from '@/components'
import { useDisclosure } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const EditSliderPage = ({ params: { id: sliderId } }) => {
  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const sliderName = query?.slider_name

  const initialUpdateInfo = {}

  //? States
  const [updateInfo, setUpdateInfo] = useState(initialUpdateInfo)

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? Queries
  //*   Get Slider
  const { data: selectedSlider, isLoading: isLoadingGetSelectedSlider } = useGetSingleSliderQuery({
    id: sliderId,
  })

  //*   Update Slider
  const [
    updateSlider,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateSliderMutation()

  //*   Delete Slider
  const [
    deleteSlider,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteSliderMutation()

  //? Handlers
  //*   Update
  const updateHandler = data => {
    setUpdateInfo(prev => ({ ...prev, ...selectedSlider.data, ...data }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateSlider({
      id: sliderId,
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
    console.log('isSuccessUpdate', isSuccessUpdate)
    console.log('isErrorUpdate', isErrorUpdate)
    back()
  }

  const onErrorUpdate = () => {
    setUpdateInfo(initialUpdateInfo)
    confirmUpdateModalHandlers.close()
  }

  //*   Delete
  const deleteHandler = () => confirmDeleteModalHandlers.open()

  const onConfirmDelete = () => deleteSlider({ id: sliderId })

  const onCancelDelete = () => confirmDeleteModalHandlers.close()

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    back()
  }

  const onErrorDelete = () => confirmDeleteModalHandlers.close()

  // ? Dictionary
  const { dict } = useLanguageContext()
  const title = dict.admin
    ? `${dict.admin.slider.edit}${dict.lang === '中文' ? '' : ' '}${dict.admin.slider.name}`
    : 'Edit Slider'
  useTitle(title + ' ' + sliderName)

  return (
    <>
      <ConfirmDeleteModal
        title={dict.admin.slider.name}
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete?.data?.message}
          message={dataDelete?.message}
          onSuccess={onSuccessDelete}
          onError={onErrorDelete}
        />
      )}

      <ConfirmUpdateModal
        title={dict.admin.slider.name}
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
        <PageContainer title={title + ' ' + sliderName}>
          {isLoadingGetSelectedSlider ? (
            <div className="px-3 py-20">
              <BigLoading />
            </div>
          ) : selectedSlider ? (
            <SliderForm
              mode="edit"
              selectedSlider={selectedSlider.data}
              updateHandler={updateHandler}
              isLoadingDelete={isLoadingDelete}
              isLoadingUpdate={isLoadingUpdate}
              deleteHandler={deleteHandler}
            />
          ) : null}
        </PageContainer>
      </main>
    </>
  )
}

export default EditSliderPage
