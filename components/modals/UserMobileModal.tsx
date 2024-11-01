import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { mobileSchema } from '@/utils'

import { useEditUserMutation } from '@/store/services'

import { TextField, SubmitModalBtn, Modal, HandleResponse } from '@/components'

interface UserMobileModalProps {
  isShow: boolean
  onClose: () => void
  editedData?: string
}

const UserMobileModal = ({ isShow, onClose, editedData }: UserMobileModalProps) => {

  //? Patch Data
  const [editUser, { data, isSuccess, isLoading, error, isError }] = useEditUserMutation()

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(mobileSchema),
    defaultValues: { mobile: editedData ? editedData : '' },
  })

  //? Handlers
  const submitHander = ({ mobile }: { mobile: string }) => {
    editUser({
      body: { mobile },
    })
  }

  //? Render(s)
  return (
    <>
      {/* Handle Edit User Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          // @ts-ignore TODO: data type
          error={error?.data?.message}
          // @ts-ignore TODO: data type
          message={data?.message}
          onSuccess={onClose}
        />
      )}

      <Modal isShow={isShow} onClose={onClose} effect="bottom-to-top">
        <Modal.Content
          onClose={onClose}
          className="flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 "
        >
          <Modal.Header onClose={onClose}>Mobile Number Record and Edit</Modal.Header>
          <Modal.Body>
            <p className="text-sm">Please enter your mobile number</p>
            <form
              className="flex flex-col justify-between flex-1 gap-y-5"
              onSubmit={handleSubmit(submitHander)}
            >
              <TextField
                label="Phone Number"
                control={control}
                errors={formErrors.mobile}
                name="mobile"
                direction="ltr"
                inputMode="tel"
              />

              <div className="py-3 border-t-2 border-gray-200 lg:pb-0 ">
                <SubmitModalBtn isLoading={isLoading}>Confirm</SubmitModalBtn>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default UserMobileModal
