'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle } from '@/hooks'
import { Address, Icons, PageContainer, Skeleton, WithAddressModal } from '@/components'
import { useUserInfo } from '@/hooks'

const BasicAddresses = ({ addressModalProps }) => {
  useTitle('Address Management')
  const { isAddress, address, isLoading, openAddressModal } = addressModalProps || {}

  //? Get User Data
  const { userInfo } = useUserInfo()

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <main>
      <PageContainer title={dict.profile?.address?.address}>
        {isLoading ? (
          <section className="flex-1 px-5 ">
            <div className="flex justify-between py-4 border-b border-gray-200">
              <Skeleton.Item animated="background" height="h-5" width="w-52" />
            </div>
            <div className="my-2 space-y-3 text-gray-500">
              <div className="flex items-center gap-x-2 ">
                <Icons.UserLocation className="text-gray-500 icon" />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </div>
              <div className="flex items-center gap-x-2 ">
                <Icons.Post className="text-gray-500 icon" />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </div>
              <div className="flex items-center gap-x-2 ">
                <Icons.Phone className="text-gray-500 icon" />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </div>

              <div className="flex items-center gap-x-2 ">
                <Icons.User className="text-gray-500 icon" />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </div>
            </div>
          </section>
        ) : isAddress ? (
          <section className="flex-1 px-5 ">
            <div className="flex justify-between py-4 border-b border-gray-200">
              <p className="text-sm">{address?.street}</p>
              <button onClick={openAddressModal}>
                <Icons.Edit className="cursor-pointer icon" />
              </button>
            </div>
            <div className="my-2 space-y-3 text-gray-500">
              <div className="flex items-center gap-x-2 ">
                <Icons.UserLocation className="text-gray-500 icon" />
                <span className="text-xs md:text-sm">
                  {address?.country}, {address?.city}, {address?.area}
                </span>
              </div>
              <div className="flex items-center gap-x-2 ">
                <Icons.Post className="text-gray-500 icon" />
                <span className="text-xs md:text-sm">{address?.postalCode}</span>
              </div>
              {userInfo?.mobile && (
                <div className="flex items-center gap-x-2 ">
                  <Icons.Phone className="text-gray-500 icon" />
                  <span className="text-xs md:text-sm">{userInfo?.mobile}</span>
                </div>
              )}
              <div className="flex items-center gap-x-2 ">
                <Icons.User className="text-gray-500 icon" />
                <span className="text-xs md:text-sm">{userInfo?.name}</span>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex flex-col items-center py-20 gap-y-4">
            <Address className="h-52 w-52" />
            <p>{dict.profile?.address?.noAddress}</p>
            <button
              className="flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3"
              onClick={openAddressModal}
            >
              <Icons.Location className="text-red-600 icon" />
              <span>{dict.profile?.address?.registration}</span>
            </button>
          </section>
        )}
      </PageContainer>
    </main>
  )
}

const Addresses = () => (
  <WithAddressModal>
    <BasicAddresses />
  </WithAddressModal>
)

export default Addresses
