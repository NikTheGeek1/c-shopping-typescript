'use client'

import { useEffect, useState } from 'react'

import { useEditUserMutation } from '@/store/services'

import { SubmitHandler, useForm } from 'react-hook-form'
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
          <Modal.Header onClose={onClose}>Address Management</Modal.Header>
          <Modal.Body>
            <p>Please enter your shipping address</p>
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
                    placeholder="Please select your province"
                  />
                  {/* @ts-ignore TODO figure out formErrors type */}
                  <DisplayError errors={formErrors.province?.name} />
                </div>

                <div className="space-y-2 ">
                  <Combobox
                    control={control}
                    name="city"
                    list={cities}
                    placeholder="Please select your city"
                  />
                  {/* @ts-ignore TODO figure out formErrors type */}
                  <DisplayError errors={formErrors.city?.name} />
                </div>

                <div className="space-y-2 ">
                  <Combobox
                    control={control}
                    name="area"
                    list={areas}
                    placeholder="Please select your district"
                  />
                  {/* @ts-ignore TODO figure out formErrors type */}
                  <DisplayError errors={formErrors.area?.name} />
                </div>

                <TextField
                  label="Street Information"
                  control={control}
                  errors={formErrors.street}
                  name="street"
                />

                <TextField
                  label="Postal Code"
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
                  Confirm
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
