import { useLanguageContext } from '@/context/LanguageContext'
import { useEditUserMutation } from '@/store/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { HandleResponse, Modal, SubmitModalBtn, TextField } from 'components'
import { useForm } from 'react-hook-form'
import { mobileSchema } from 'utils'

const UserMobileModal = props => {
  //? Props
  const { isShow, onClose, editedData } = props

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
  const submitHander = ({ mobile }) => {
    editUser({
      body: { mobile },
    })
  }

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <>
      {/* Handle Edit User Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onClose}
        />
      )}

      <Modal isShow={isShow} onClose={onClose} effect="bottom-to-top">
        <Modal.Content
          onClose={onClose}
          className="flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 "
        >
          <Modal.Header onClose={onClose}>{dict.profile?.account?.record}</Modal.Header>
          <Modal.Body>
            <p className="text-sm">{dict.profile?.account?.enterPhone}</p>
            <form
              className="flex flex-col justify-between flex-1 gap-y-5"
              onSubmit={handleSubmit(submitHander)}
            >
              <TextField
                label={dict.profile?.account?.phone}
                control={control}
                errors={formErrors.mobile}
                name="mobile"
                direction="ltr"
                inputMode="tel"
              />

              <div className="py-3 border-t-2 border-gray-200 lg:pb-0 ">
                <SubmitModalBtn isLoading={isLoading}>
                  {dict.profile?.account?.confirm}
                </SubmitModalBtn>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default UserMobileModal
