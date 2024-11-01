import { Button, Modal } from '@/components'

interface ConfirmUpdateModalProps {
  title: string
  isLoading: boolean
  isShow: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmUpdateModal = ({ title, isLoading, isShow, onClose, onConfirm, onCancel }: ConfirmUpdateModalProps) => {

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect="ease-out">
      <Modal.Content onClose={onClose}>
        <Modal.Body>
          <div className="px-3 py-6 space-y-4 text-center bg-white md:rounded-lg">
            <p>
              Do you agree to update the changes to <span className="font-bold text-green-500">{title}</span>?
            </p>
            <div className="flex justify-center gap-x-20">
              <Button onClick={onConfirm} isLoading={isLoading}>
                Confirm
              </Button>

              <Button className="!bg-green-500" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmUpdateModal
