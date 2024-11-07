'use client'

import { EmptyCustomList, PageContainer, ResponsiveImage, TableSkeleton } from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import { useGetBannersQuery, useGetCategoriesQuery } from '@/store/services'
import Link from 'next/link'
import { Category } from '@/types'

interface Banner {
  _id: string;
  image: { url: string };
  title: string;
  type: string;
}

const BannersPage: React.FC = () => {
  const query = useUrlQuery()

  const category_id = query?.category_id as string | undefined
  const category_name = query?.category_name as string | undefined

  //? Get Categories
  const { categories, isLoading: isLodingGetCategories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.data?.categories
        .filter((category: Category) => category.level < 2)
        .sort((a: Category, b: Category) => a.level - b.level),
      isLoading,
    }),
    skip: !!category_id,
  })

  const { data: banners, isLoading: isLoading_get_banners } = useGetBannersQuery(
    { category: category_id || "" },
    {
      skip: !!!category_id,
    }
  )

  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  const title = `${dict.admin?.banner.title}${category_name ? ` - ${category_name}` : ''}`
  useTitle(title)
  const renderContent = () => {
    if (isLoading_get_banners || isLodingGetCategories) {
      return (
        <tr>
          <td colSpan={4}>
            <TableSkeleton />
          </td>
        </tr>
      )
    }

    if (categories && !category_id) {
      return categories.map((category: Category) => (
        <tr
          className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50"
          key={category._id}
        >
          <td className="w-3/4 px-2 py-4">{category.name}</td>
          <td className="px-2 py-4">
            <Link
              href={`/admin/banners?category_id=${category._id}&category_name=${category.name}`}
              className="bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block"
            >
              {dict.admin?.banner.subset}
            </Link>
          </td>
        </tr>
      ))
    }

    if (banners?.data && (banners.data as Banner[]).length > 0) {
      return (banners.data as Banner[]).map((banner: Banner) => (
        <tr
          className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50"
          key={banner._id}
        >
          <td className="px-2 py-4">
            <ResponsiveImage
              dimensions={`h-7 ${banner.type === 'one' ? 'w-16' : 'w-10'}`}
              className="mx-auto"
              src={banner.image?.url}
              alt=""
            />
          </td>
          <td className="px-2 py-4">{banner.title}</td>
          <td className="px-2 py-4">{banner.type}</td>
          <td className="px-2 py-4">
            <Link
              href={`/admin/banners/edit/${banner._id}?banner_name=${banner.title}`}
              className="bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block"
            >
              {dict.admin?.banner.edit}
            </Link>
          </td>
        </tr>
      ))
    } else
      return (
        <tr>
          <td colSpan={4}>
            <EmptyCustomList />
          </td>
        </tr>
      )
  }

  return (
    <main>
      <PageContainer title={title}>
        <section className="p-3 mx-auto mb-10 space-y-8">
          {category_id && (
            <Link
              href={`banners/create?category_id=${category_id}&category_name=${category_name}`}
              className="flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3"
            >
              {dict.admin?.banner.title}
            </Link>
          )}
          <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
            <table className="w-full whitespace-nowrap">
              <thead className="h-9 bg-emerald-50">
                <tr className="text-emerald-500">
                  {category_name && (
                    <th className="border-gray-100 border-x-2">{dict.admin?.banner.image}</th>
                  )}
                  <th className="px-2 border-gray-100 border-x-2">
                    {category_name ? dict.admin?.banner.title : dict.admin?.banner.categoryName}
                  </th>
                  {category_name && (
                    <th className="border-gray-100 border-x-2">{dict.admin?.banner.type}</th>
                  )}
                  <th className="border-gray-100 border-x-2">{dict.admin?.banner.action}</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">{renderContent()}</tbody>
            </table>
          </div>
        </section>
      </PageContainer>
    </main>
  )
}

export default BannersPage
