import { useLanguageContext } from '@/context/LanguageContext'
import { Icons, Skeleton, WithAddressModal } from '@/components'

interface IAddressModalProps {
  addressModalProps: {
    address?: any
    isLoading?: boolean
    isVerify?: boolean
    openAddressModal?: () => void
    isAddress?: boolean
  }
}

const BasicAddressBar = ({ addressModalProps }: IAddressModalProps) => {
  //? Props
  const { address, isLoading, isVerify, openAddressModal, isAddress } = addressModalProps || {}

  // ? Dictionary
  const translation = useLanguageContext()

  //? Render(s)
  if (!isVerify) {
    return null
  } else if (isLoading) {
    return <Skeleton.Item animated="background" height="h-5 lg:h-6" width="w-3/4 lg:w-1/4" />
  } else if (!isAddress) {
    return (
      <button
        type="button"
        onClick={openAddressModal}
        className="flex items-center w-full gap-x-1 lg:w-fit"
      >
        <Icons.Location2 className="icon" />
        <span>{translation?.dict?.header?.address?.select}</span>

        <Icons.ArrowRight2 className="mr-auto icon" />
      </button>
    )
  } else if (isAddress) {
    return (
      <button
        type="button"
        onClick={openAddressModal}
        className="flex items-center w-full gap-x-1 lg:w-fit"
      >
        <Icons.Location2 className="icon" />
        <span>
          {translation?.dict?.header?.address?.send} {address?.country}, {address?.city},{' '}
          {address?.area}
        </span>
        <Icons.ArrowRight2 className="mr-auto icon" />
      </button>
    )
  }
}

export default function AddressBar() {
  return (
    <WithAddressModal>
      <BasicAddressBar addressModalProps={{}}/>
    </WithAddressModal>
  )
}
