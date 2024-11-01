'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useGetOrdersQuery } from '@/store/services'
import { ArrowLink, Skeleton } from '@/components'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { formatNumber } from '@/utils'

export default function Orders() {
  //? States
  const [pendingOrder, setPendingOrder] = useState(0)
  const [successOrder, setSuccessOrder] = useState(0)

  //? Get Order Query
  const { data, isLoading } = useGetOrdersQuery({ page: 1, pageSize: 100 })

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Handle Get Order Response
  useEffect(() => {
    if (data) {
      const pending = data?.data?.orders.filter(item => item.delivered === false)
      const success = data?.data?.orders.filter(item => item.delivered === true)

      setPendingOrder(pending.length)
      setSuccessOrder(success.length)
    }
  }, [data])

  //? Local Components
  const StatusSkeleton = () => (
    <Skeleton.Item
      animated="background"
      height=" h-16 lg:h-14"
      width="w-12 lg:w-28"
      className="rounded-sm"
    />
  )

  //? Render(s)
  return (
    <section>
      <div className="py-6 lg:py-0">
        <div className="flex justify-between px-5 mb-7">
          <h4 className="inline-block py-1 text-sm border-b-2 border-red-500 md:text-base">
            {dict.profile?.order?.title}
          </h4>
          <ArrowLink path="profile/orders">{dict.profile?.order?.viewAll}</ArrowLink>
        </div>
        <div className="flex justify-evenly lg:py-20">
          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
                <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image
                  src="/icons/status-processing.svg"
                  fill
                  alt={dict.profile?.order?.currentOrders || 'Current Orders'}
                />
                <span className="absolute order-badge">{formatNumber(pendingOrder)}</span>
                </div>
              <div className="text-gray-700">
                <span className="hidden lg:block lg:text-black lg:text-md">
                  {formatNumber(pendingOrder)} {dict.profile?.order?.records}
                </span>
                <span className="text-xs lg:text-sm">{dict.profile?.order?.currentOrders}</span>
              </div>
            </div>
          )}

          <div className="section-divide-x" />

          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image
                  src="/icons/status-delivered.svg"
                  fill
                  alt={dict.profile?.order?.completeOrders || "Delivered Orders"}
                />
                <span className="absolute order-badge">{formatNumber(successOrder)}</span>
              </div>
              <div className="text-gray-700">
                <span className="hidden lg:block lg:text-black lg:text-md">
                  {formatNumber(successOrder)} {dict.profile?.order?.records}
                </span>
                <span className="text-xs lg:text-sm">{dict.profile?.order?.completeOrders}</span>
              </div>
            </div>
          )}

          <div className="section-divide-x" />

          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image
                  src="/icons/status-returned.svg"
                  fill
                  alt={dict.profile?.order?.refundedOrders || "Returned Orders"}
                />
                <span className="absolute order-badge">0</span>
              </div>
              <div className="text-gray-700">
                <span className="hidden lg:block lg:text-black lg:text-md">
                  0 {dict.profile?.order?.records}
                </span>
                <span className="text-xs lg:text-sm">{dict.profile?.order?.refundedOrders}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="section-divide-y" />
    </section>
  )
}
