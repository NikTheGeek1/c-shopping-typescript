'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import { useGetOrdersQuery } from '@/store/services'
import {
  EmptyOrdersList,
  OrderCard,
  OrderSkeleton,
  PageContainer,
  Pagination,
  ShowWrapper,
} from 'components'
import { useChangeRoute } from 'hooks'

const Orders = () => {
  useTitle('Order Management')
  //? Assets
  const query = useUrlQuery()
  const changeRoute = useChangeRoute()

  //? Get Orders Data
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetOrdersQuery({
    pageSize: 5,
    page: query.page ? +query.page : 1,
  })

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render
  return (
    <main id="profileOrders">
      <PageContainer title={dict.profile?.order.history}>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? data?.data?.ordersLength : 0}
          emptyComponent={<EmptyOrdersList />}
          loadingComponent={<OrderSkeleton />}
        >
          <div className="px-4 py-3 space-y-3">
            {data?.data?.orders.map(item => <OrderCard key={item._id} order={item} />)}
          </div>
        </ShowWrapper>

        {data && data?.data?.ordersLength > 5 && (
          <div className="py-4 mx-auto lg:max-w-5xl">
            <Pagination
              pagination={data?.data?.pagination}
              changeRoute={changeRoute}
              section="profileOrders"
              client
            />
          </div>
        )}
      </PageContainer>
    </main>
  )
}
export default Orders
