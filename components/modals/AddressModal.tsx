'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useEditUserMutation } from '@/store/services'
// @ts-ignore
import { yupResolver } from '@hookform/resolvers/yup'

import { addressSchema } from '@/utils'

import { useUserInfo } from '@/hooks'

//@ts-ignore
import regions from 'china-citys';

import {
  TextField,
  DisplayError,
  SubmitModalBtn,
  Combobox,
  Modal,
  HandleResponse,
} from '@/components'
import { UserAddress } from '@/types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


interface AddressModalProps {
  isShow: boolean
  onClose: () => void
  address: any
}

const AddressModal = ({ isShow, onClose, address }: AddressModalProps) => {

  //? Assets
  let AllProvinces = regions.getProvinces()

  //? Get User Data
  const { userInfo } = useUserInfo()

  //? State
  const [cities, setCities] = useState([])
  const [areas, setAreas] = useState([])

  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: address,
  })

  //? Edit User-Info Query
  const [editUser, { data, isSuccess, isLoading, isError, error }] = useEditUserMutation()

  //? Re-Renders
  //* Change cities beside on province
  useEffect(() => {
    setValue('area', {})
    getValues('city')?.code ? setAreas(regions.getAreasByCity(getValues('city')?.code)) : ''
    watch('city')
  }, [getValues('city')?.code])

  useEffect(() => {
    setValue('city', {})
    setCities(regions.getCitysByProvince(getValues('province')?.code))
    watch('province')
  }, [getValues('province')?.code])

  useEffect(() => {
    if (userInfo?.address) {
      setValue('city', userInfo.address.city)
      setValue('area', userInfo.address.area)
    }
  }, [])

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
                <div className="space-y-2">
                  <Combobox
                    control={control}
                    name="province"
                    list={AllProvinces}
                    placeholder={dict.header?.address?.modal?.province}
                  />
                  {/* @ts-ignore TODO figure out formErrors type */}
                  <DisplayError errors={formErrors.province?.name} />
                </div>

                <div className="space-y-2 ">
                  <Combobox
                    control={control}
                    name="city"
                    list={cities}
                    placeholder={dict.header?.address?.modal?.city}
                  />
                  {/* @ts-ignore TODO figure out formErrors type */}
                  <DisplayError errors={formErrors.city?.name} />
                </div>

                <div className="space-y-2 ">
                  <Combobox
                    control={control}
                    name="area"
                    list={areas}
                    placeholder={dict.header?.address?.modal?.area}
                  />
                  {/* @ts-ignore TODO figure out formErrors type */}
                  <DisplayError errors={formErrors.area?.name} />
                </div>

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
