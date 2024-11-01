import { useLanguageContext } from '@/context/LanguageContext'
import { useGetProductsQuery } from '@/store/services'
import { DiscountProduct, Icons, ProductPrice, ResponsiveImage, Skeleton } from 'components'
import Link from 'next/link'

<<<<<<<< HEAD:components/product/MostFavouriteProducts.tsx
import { DiscountProduct, ProductPrice, Icons, ResponsiveImage, Skeleton } from '@/components'
import { useGetProductsQuery } from '@/store/services'

interface MostFavouriteProductsProps {
  categorySlug: string
}

const MostFavouriteProducts = ({ categorySlug }: MostFavouriteProductsProps) => {
========
const MostFavouriteProducts = props => {
  //? Props
  const { categorySlug } = props
>>>>>>>> i18n-fork/nacho/i18n:components/product/MostFavouriteProducts.jsx

  const { products, isLoading } = useGetProductsQuery(
    {
      sort: '-sold',
      category: categorySlug,
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        products: data?.data?.products,
        isLoading,
      }),
    }
  )

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <section className="px-3">
      <div className="flex items-center mb-3 space-x-2">
        <Icons.Heart className="icon text-amber-400" />
<<<<<<<< HEAD:components/product/MostFavouriteProducts.tsx
        <h4 className="text-xl">Most Popular Products</h4>
========
        <h4 className="text-xl">{dict.popular?.title}</h4>
>>>>>>>> i18n-fork/nacho/i18n:components/product/MostFavouriteProducts.jsx
      </div>
      <div className="grid grid-cols-2 gap-1 md:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array(10)
              .fill('_')
              .map((_, index) => (
                <Skeleton.Items key={index} className="p-1">
                  <Skeleton.Item
                    height="h-32 md:h-36"
                    width="w-28 md:w-32"
                    animated="background"
                    className="rounded-md mx-auto"
                  />
                  <Skeleton.Item
                    height="h-5"
                    width="w-32"
                    animated="background"
                    className="mt-4 mx-auto"
                  />
                  <Skeleton.Item
                    height="h-5"
                    width="w-20"
                    animated="background"
                    className="mt-4 mx-auto"
                  />
                </Skeleton.Items>
              ))
          : products?.map(product => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <article className="p-1 transition border border-gray-50 hover:border-gray-200 min-h-[248px]">
                  <div className="flex gap-x-1 ">
                    <span className="text-base">{product.rating.toFixed(1)}</span>
                    <Icons.Star className="w-5 h-5 md:w-7 md:h-7 text-amber-400 " />
                  </div>

                  <ResponsiveImage
                    dimensions="h-32 w-28 md:w-32 md:h-36"
                    className="mx-auto"
                    src={product.images[0].url}
                    alt={product.title}
                  />
                  <div
                    className={`flex items-start mt-2 gap-x-2 ${
                      product.discount ? 'justify-evenly' : 'justify-end pl-8'
                    }`}
                  >
                    {product.discount ? <DiscountProduct discount={product.discount} /> : null}
                    <ProductPrice
                      inStock={product.inStock}
                      discount={product.discount}
                      price={product.price}
                    />
                  </div>
                </article>
              </Link>
            ))}
      </div>
    </section>
  )
}

export default MostFavouriteProducts
