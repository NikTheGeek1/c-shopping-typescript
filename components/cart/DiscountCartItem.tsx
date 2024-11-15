import { formatNumber } from '@/utils'

type DiscountCartItemProps = {
  discount: number
  price: number
}

const DiscountCartItem = ({ discount, price }: DiscountCartItemProps) => {
  //? Assets
  const discountPercent = discount / 100
  console.log('discountPercent', discountPercent)

  //? Render(s)
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <span className="text-red-500">{formatNumber(+(price * discountPercent).toFixed())}</span>

        <span className="text-red-500">€</span>

        <span className="text-red-500">Discount</span>
      </div>
      <div className="flex items-center gap-x-2">
        <span className="text-sm text-gray-700">
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <span className="">€</span>
      </div>
    </div>
  )
}

export default DiscountCartItem
