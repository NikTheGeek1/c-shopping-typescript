import { Icons } from '@/components'

import { formatNumber } from '@/utils'

interface DepotProps {
  inStock: number
}

const Depot = ({ inStock }: DepotProps) => {
  //? Render(s)
  if (inStock < 10 && inStock !== 0) {
    <span className="text-red-500">Only {formatNumber(inStock)} left in stock</span>
  } else if (inStock > 10) {
    return (
      <div className="flex text-teal-400 gap-x-1">
        <Icons.Save className="text-teal-400 icon" />
        <span className="text-teal-700">Available in depot</span>
      </div>
    )
  } else if (inStock === 0) {
    return null
  }
}

export default Depot
