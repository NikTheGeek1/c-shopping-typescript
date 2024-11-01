import { OrderEmpty } from '@/components'

export default function EmptyOrdersList() {
  return (
    <div className="py-20">
      <OrderEmpty className="mx-auto h-52 w-52" />

      <p className="text-center">The list is empty</p>
    </div>
  )
}