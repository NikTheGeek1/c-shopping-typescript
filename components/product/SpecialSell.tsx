
interface SpecialSellProps {
  discount: number
  inStock: number
}

const SpecialSell = ({ discount, inStock }: SpecialSellProps) => {

  //? Render(s)
  if (discount > 0 && inStock !== 0) {
    <div className="w-fit h-7 text-red-500">Special Sale</div>
  } else {
    return <div className="h-7" />
  }
}

export default SpecialSell
