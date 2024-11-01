import { db } from '@/helpers'

import { Category, Banner, Slider } from '@/models'

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  MostFavouriteProducts,
  Slider as MainSlider,
} from '@/components'
import { siteTitle } from '@/utils'
import { Category as CategoryType } from '@/types'

// export const revalidate = 20
export const dynamic = 'force-dynamic'

interface Props {
  params: {
    category: string
  }
}


export const getData = async (category: string) => {
  await db.connect()

  const currentCategory = await Category.findOne({
    slug: category,
  }).lean<CategoryType>()

  if (!currentCategory) return { notFound: true }

  const sliders = await Slider.find({ category_id: currentCategory?._id }).lean()

  const bannerOneType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'one',
  }).lean()
  const bannerTwoType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'two',
  }).lean()

  const childCategories = await Category.find({
    parent: currentCategory?._id,
  }).lean()

  await db.disconnect()
  return {
    currentCategory,
    sliders,
    bannerOneType,
    bannerTwoType,
    childCategories,
  }
}

const MainCategory = async ({ params: { category } }: Props) => {
  const { currentCategory, sliders, bannerOneType, bannerTwoType, childCategories } =
    await getData(category)

  //? Render(s)
  return (
    <main className="container min-h-screen space-y-6 xl:mt-28">
      <div className="py-4 mx-auto space-y-12 xl:mt-28">
        {/* @ts-ignore TODO: fix types of getData() return value */}
        <MainSlider data={sliders} />

        <DiscountSlider currentCategory={currentCategory!} />

        <Categories
          // @ts-ignore TODO: fix types of getData() return value
          childCategories={{ categories: childCategories, title: 'All Categories' }}
          color={currentCategory?.colors?.start || ''}
          name={currentCategory?.name || ''}
        />

        {/* @ts-ignore TODO: fix types of getData() return value */}
        <BannerOne data={bannerOneType} />

        {/* @ts-ignore TODO: fix types of getData() return value */}
        <BestSellsSlider categorySlug={currentCategory?.slug || ""} />

        {/* @ts-ignore TODO: fix types of getData() return value */}
        <BannerTwo data={bannerTwoType} />

        <MostFavouriteProducts categorySlug={currentCategory?.slug || ""} />
      </div>
    </main>
  )
}

export default MainCategory

export async function generateMetadata({ params: { category } }: Props) {
  const { currentCategory, sliders, bannerOneType, bannerTwoType, childCategories } =
    await getData(category)

  return {
    title: `${currentCategory?.name} | ${siteTitle}`,
  }
}
