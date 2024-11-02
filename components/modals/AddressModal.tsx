'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useEditUserMutation } from '@/store/services'
// @ts-ignore
import { yupResolver } from '@hookform/resolvers/yup'

import { addressSchema } from '@/utils'

import { useUserInfo } from '@/hooks'

import {
  TextField,
  DisplayError,
  SubmitModalBtn,
  Modal,
  HandleResponse,
} from '@/components'
import { UserAddress } from '@/types'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'


interface AddressModalProps {
  isShow: boolean
  onClose: () => void
  address: any
}

const AddressModal = ({ isShow, onClose, address }: AddressModalProps) => {

  //? Get User Data
  const { userInfo } = useUserInfo()

  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: address,
  })

  //? Edit User-Info Query
  const [editUser, { data, isSuccess, isLoading, isError, error }] = useEditUserMutation()

  // Load user address on modal open
  useEffect(() => {
    if (userInfo?.address) {
      setValue('city', userInfo.address.city)
      setValue('area', userInfo.address.area)
    }
  }, [userInfo])

  //? Handlers
  const submitHander = (address: UserAddress) => {
    editUser({
      // @ts-ignore TODO: figure out editUser type
      body: { address },
    })
  }

  //? Render(s)
  return (
    <>
      {/* Handle Edit Address Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          // @ts-ignore TODO: figure out error type
          error={error?.data?.message}
          // @ts-ignore TODO: figure out data
          message={data?.message}
          onSuccess={onClose}
        />
      )}

      <Modal isShow={isShow} onClose={onClose} effect="bottom-to-top">
        <Modal.Content
          onClose={onClose}
          className="flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 "
        >
          <Modal.Header onClose={onClose}>{dict.header?.address?.modal?.title}</Modal.Header>
          <Modal.Body>
            <p>{dict.header?.address?.modal?.description}</p>
            <form
              className="flex flex-col justify-between flex-1 pl-4 overflow-y-auto"
              onSubmit={handleSubmit(submitHander)}
            >
              <div className="space-y-12 md:grid md:grid-cols-3 md:gap-x-12 md:gap-y-5 md:items-baseline ">
                <TextField
                  label={dict.header?.address?.modal?.country}
                  control={control}
                  errors={formErrors.country}
                  name="country"
                />

                <TextField
                  label={dict.header?.address?.modal?.city}
                  control={control}
                  errors={formErrors.city}
                  name="city"
                />

                <TextField
                  label={dict.header?.address?.modal?.area}
                  control={control}
                  errors={formErrors.area}
                  name="area"
                />

                <TextField
                  label={dict.header?.address?.modal?.street}
                  control={control}
                  errors={formErrors.street}
                  name="street"
                />

                <TextField
                  label={dict.header?.address?.modal?.code}
                  control={control}
                  errors={formErrors.postalCode}
                  name="postalCode"
                  type="number"
                  direction="ltr"
                  inputMode="numeric"
                />
              </div>

              <div className="py-3 border-t-2 border-gray-200 lg:pb-0 flex">
                <SubmitModalBtn isLoading={isLoading} className="ml-auto">
                  {dict.header?.address?.modal?.submit}
                </SubmitModalBtn>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default AddressModal
