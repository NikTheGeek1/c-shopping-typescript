import { cn } from "@/utils/mergeClasses"

interface DiscountProductProps {
  discount: number
}

export default function DiscountProduct({ discount }: DiscountProductProps) {
  return (
    <span className={cn("bg-red-500 inline-block pt-0.5 px-2 text-white rounded-xl tracking-widest", !discount && "invisible")}>
      {discount}%
    </span>
  )
}
