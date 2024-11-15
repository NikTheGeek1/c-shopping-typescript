import { FreeShippingSvg } from '@/components'

export default function FreeShipping() {
  return (
    <div className="py-5 bg-background dark:bg-gray-950 px-7 lg:bg-transparent lg:px-0 ">
      <div className="flex justify-between bg-background border border-gray-300 dark:border-gray-700 rounded-lg">
        <div className="p-3">
            <h4>Free Shipping</h4>
            <p className="mt-2 text-xs text-gray-500 lg:text-sm">Orders over 500,000</p>
        </div>
        <FreeShippingSvg className="w-32 h-20 px-4" />
      </div>
    </div>
  )
}
