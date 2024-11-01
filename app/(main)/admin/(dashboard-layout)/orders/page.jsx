'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import { useGetOrdersListQuery } from '@/store/services'
import {
  EmptyOrdersList,
  OrdersTable,
  PageContainer,
  Pagination,
  ShowWrapper,
  TableSkeleton,
} from 'components'
import { useChangeRoute } from 'hooks'

const OrdersHome = () => {
  // ? Dictionary
  const { dict } = useLanguageContext()
  useTitle(dict.admin?.orders.title || 'Order Management')
  //? Assets
  const query = useUrlQuery()
  const page = query.page ? +query.page : 1

  const changeRoute = useChangeRoute()

  //? Get Orders Query
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetOrdersListQuery({
    page,
    pageSize: 10,
  })

  //? Render(s)
  return (
    <main id="_adminOrders">
      <PageContainer title={dict.admin?.orders.title}>
        <section className="p-3 md:px-3 xl:px-8 2xl:px-10" id="orders">
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data?.data?.ordersLength ?? 0}
            emptyComponent={<EmptyOrdersList />}
            loadingComponent={<TableSkeleton />}
          >
            {data && <OrdersTable orders={data?.data?.orders} />}
          </ShowWrapper>

          {data && data?.data?.ordersLength > 10 && (
            <div className="py-4 mx-auto lg:max-w-5xl">
              <Pagination
                pagination={data?.data?.pagination}
                changeRoute={changeRoute}
                section="_adminOrders"
              />
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  )
}

export default OrdersHome
