import { FilterOperation } from '@/components'

interface ProductsAsideProps {
  mainMaxPrice: number
  mainMinPrice: number
  handleChangeRoute: (query: Record<string, string | number | boolean>) => void
}

const ProductsAside = ({ mainMaxPrice, mainMinPrice, handleChangeRoute }: ProductsAsideProps) => {

  //? Render(s)
  return (
    <aside className="hidden xl:mt-6 xl:w-60 2xl:w-64 xl:border xl:border-gray-200 xl:rounded-md xl:py-4 xl:px-3 xl:block xl:sticky xl:top-32 xl:h-fit ">
      <FilterOperation
        mainMaxPrice={mainMaxPrice}
        mainMinPrice={mainMinPrice}
        handleChangeRoute={handleChangeRoute}
      />
    </aside>
  )
}

export default ProductsAside
