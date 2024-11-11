'use client'

import {
  ProductCard,
  Pagination,
  Sort,
  ProductsAside,
  SubCategories,
  Filter,
  ProductSkeleton,
} from '@/components'

import { useChangeRoute, useMediaQuery } from '@/hooks'

import { useUrlQuery } from '@/hooks'
import { useGetCategoriesQuery, useGetProductsQuery } from '@/store/services'

const ProductsHome = () => {
  //? Assets
  const query = useUrlQuery()

  const category = query?.category
  const page_size = query?.page_size
  const page = query?.page
  const sort = query?.sort
  const search = query?.search
  const inStock = query?.inStock
  const discount = query?.discount
  const price = query?.price

  const isDesktop = useMediaQuery('(min-width:1280px)')

  //? Handlers
  const changeRoute = useChangeRoute()

  const handleChangeRoute = (newQueries: any) => {
    changeRoute({
      ...query,
      page: 1,
      ...newQueries,
    })
  }

  console.log("sort", sort)
  //? Querirs
  //*    Get Products Data
  const { data, isFetching: isFetchingProduct } = useGetProductsQuery({
    category: category?.toString(),
    page_size: page_size ? +page_size : undefined,
    page: page ? +page : undefined,
    sort: sort?.toString(),
    search: search?.toString(),
    inStock: !!inStock,
    discount: discount ? +discount : undefined,
    price: price ? +price : undefined,
  })

  //*    Get childCategories Data
  const { isLoading: isLoadingCategories, childCategories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ isLoading, data }) => {
      const currentCategory = data?.data?.categories.find(cat => cat.slug === query?.category)
      const childCategories = data?.data?.categories.filter(
        cat => cat.parent === currentCategory?._id
      )
      return { childCategories, isLoading }
    },
  })

  //? Render(s)
  return (
    <>
      <main className="lg:px-3 container xl:mt-32">
        <SubCategories childCategories={childCategories!} isLoading={isLoadingCategories} />

        <div className="px-1 lg:flex lg:gap-x-0 xl:gap-x-3">
          <ProductsAside
            mainMaxPrice={data?.data?.mainMaxPrice!}
            mainMinPrice={data?.data?.mainMinPrice!}
            handleChangeRoute={handleChangeRoute}
          />
          <div id="_products" className="w-full p-4 mt-3 ">
            {/* Filters & Sort */}
            <div className="divide-y-2 ">
              <div className="flex py-2 gap-x-3">
                {!isDesktop && (
                  <Filter
                    mainMaxPrice={data?.data?.mainMaxPrice!}
                    mainMinPrice={data?.data?.mainMinPrice!}
                    handleChangeRoute={handleChangeRoute}
                  />
                )}

                <Sort handleChangeRoute={handleChangeRoute} />
              </div>

              <div className="flex justify-between py-2">
                <span>All Products</span>
                <span className="">{data?.data?.productsLength} items found</span>
              </div>
            </div>

            {/* Products */}
            {isFetchingProduct ? (
              <ProductSkeleton />
            ) : data && data?.data?.products.length > 0 ? (
              <section className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {data?.data?.products.map(item => <ProductCard product={item as any} key={item._id} />)}
              </section>
            ) : (
              <section className="text-center text-red-500 xl:border xl:border-gray-200 xl:rounded-md xl:py-4">
                No products found
              </section>
            )}
          </div>
        </div>

        {data && data?.data?.productsLength > 10 && (
          <div className="py-4 mx-auto lg:max-w-5xl">
            <Pagination
              pagination={data?.data?.pagination}
              changeRoute={handleChangeRoute}
              section="_products"
              client
            />
          </div>
        )}
      </main>
    </>
  )
}

export default ProductsHome
