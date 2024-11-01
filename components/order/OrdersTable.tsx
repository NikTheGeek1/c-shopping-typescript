import { EditIconBtn } from '@/components/common/IconBtns'
import { useLanguageContext } from '@/context/LanguageContext'
import moment from 'moment-jalaali'
import Link from 'next/link'

interface OrdersTableProps {
  orders: {
    _id: string
    delivered: boolean
    user: {
      name: string
      email: string
    }
    createdAt: string
  }[]
}

const OrdersTable = ({ orders }: OrdersTableProps) => {

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <div className="overflow-x-auto mt-7">
      <table className="w-full whitespace-nowrap">
        <thead className="h-9 bg-emerald-50">
          <tr className="text-emerald-500">
            <th className="border-gray-100 border-x-2">ID</th>
            <th>{dict.profile?.order?.details?.name}</th>
            <th>{dict.profile?.order?.details?.status}</th>
            <th className="border-gray-100 border-x-2">{dict.profile?.order?.details?.email}</th>
            <th>{dict.profile?.order?.details?.time}</th>
            <th>{dict.profile?.order?.details?.change}</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {orders.length > 0 &&
            orders.map(order => (
              <tr
                className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50"
                key={order._id}
              >
                <td className="py-3 px-1.5">{order._id}</td>
                <td className="py-3 px-1.5">{order.user.name}</td>
                <td className="py-3 px-1.5">
                  {order.delivered ? (
                    <span className="inline-block p-1 text-green-600 rounded-md bg-green-50">
                      {dict.profile?.order?.details?.completed}
                    </span>
                  ) : (
                    <span className="p-1 rounded-md text-amber-600 bg-amber-50">
                      {dict.profile?.order?.details?.unconfirmed}
                    </span>
                  )}
                </td>
                <td className="py-3 px-1.5">{order.user.email}</td>
                <td>{moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td className="p-2">
                  <Link href={`/admin/orders/${order._id}`}>
                    <EditIconBtn />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable
