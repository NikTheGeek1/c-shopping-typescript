import { Button, Modal } from '@/components'

interface ConfirmDeleteModalProps {
  title: string
  isLoading: boolean
  isShow: boolean
  onClose: () => void
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDeleteModal({ title, isLoading, isShow, onClose, onCancel, onConfirm }: ConfirmDeleteModalProps) {

  //? Render(s)
  return (
    <>
      <Modal isShow={isShow} onClose={onClose} effect="ease-out">
        <Modal.Content onClose={onClose}>
          <Modal.Body>
            <div className="px-3 py-6 space-y-4 text-center bg-white md:rounded-lg">
              <p>
                Are you sure you want to delete <span className="font-bold text-red-500">{title}</span>?
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
    </>
  )
}
