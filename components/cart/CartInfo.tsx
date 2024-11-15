import { formatNumber } from '@/utils'

import { Button } from '@/components'

import { useAppSelector } from '@/hooks'
import { RootState } from '@/store'

type CartInfoProps = {
  handleRoute: () => void
  cart: boolean
}

const CartInfo = ({ handleRoute, cart }: CartInfoProps) => {

  //? Store
  const { totalItems, totalPrice, totalDiscount } = useAppSelector((state: RootState) => state.cart)

  //? Render(s)
  return (
    <div className="px-4 py-2 mt-10 space-y-5 lg:mt-0 lg:h-fit lg:py-4">
      {/* total cart price */}
      <div className="pb-2 border-b border-gray-200 flex justify-between">
        <span className="text-sm">Product Price ({formatNumber(totalItems)} items)</span>
        <div className="flex-center">
          <span className="">{formatNumber(totalPrice)}</span>
          <span className="ml-1">€</span>
        </div>
      </div>

      {/* total cart items */}
      <div className="flex justify-between">
        <span>Total Cart</span>
        <div className="flex-center">
          <span className="text-sm">{formatNumber(totalPrice - totalDiscount)}</span>
          <span className="ml-1">€</span>
        </div>
      </div>

      <span className="inline-block w-full pb-2 border-b border-gray-200 lg:max-w-xs">
        Shipping costs are calculated based on your shipment's address, delivery time, weight, and volume
      </span>

      {/* total cart profit */}
      <div className="flex justify-between">
        <span className="text-red-500">Amount you saved from the purchase</span>
        <div className="flex-center gap-x-1">
          <span className="text-red-500 text-sm">
            ({((totalDiscount / totalPrice) * 100).toFixed(1)}%)
          </span>
          <span className="text-red-500">{formatNumber(totalDiscount)}</span>
          <span className="ml-1 text-red-500">€</span>
        </div>
      </div>

      {cart && (
        <Button onClick={handleRoute} className="hidden w-full lg:block">
          Continue
        </Button>
      )}
    </div>
  )
}

export default CartInfo
