'use client'
import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle } from '@/hooks'
import { useGetCategoriesQuery } from '@/store/services'
import { BigLoading, PageContainer } from 'components'
import moment from 'moment-jalaali'
import Link from 'next/link'

const DetailsPage = () => {
  // ? Dictionary
  const { dict } = useLanguageContext()
  useTitle(dict.admin ? dict.admin.category.details.title : '分类规格')
  //? Get Categories
  const { categories, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.data?.categories.filter(category => category.level === 2),
      isLoading,
    }),
  })

  //? Render(s)
  if (isLoading)
    return (
      <div className="px-3 py-20">
        <BigLoading />
      </div>
    )

  return (
    <main>
      <PageContainer title={dict.admin?.category.details.title}>
        <section className="p-3 mx-auto mb-10 space-y-8">
          <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
            <table className="w-full whitespace-nowrap">
              <thead className="h-9 bg-emerald-50">
                <tr className="text-emerald-500">
                  <th className="px-2 border-gray-100 border-x-2">
                    {dict.admin?.category.details.name}
                  </th>
                  <th className="px-2 border-gray-100 border-x-2">
                    {dict.admin?.category.details.createTime}
                  </th>
                  <th className="px-2 border-gray-100 border-x-2">
                    {dict.admin?.category.details.updateTime}
                  </th>
                  <th className="border-gray-100 border-x-2">
                    {dict.admin?.category.details.action}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {categories &&
                  categories.map(category => (
                    <tr
                      className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50"
                      key={category._id}
                    >
                      <td className="w-1/4 px-2 py-4">{category.name}</td>
                      <td className="w-1/4 px-2 py-4">
                        {moment(category.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      </td>
                      <td className="w-1/4 px-2 py-4">
                        {moment(category.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                      </td>
                      <td className="px-2 py-4">
                        <Link
                          href={`/admin/details/${category._id}?category_name=${category.name}`}
                          className="bg-blue-50 text-blue-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block"
                        >
                          {dict.admin?.category.details.edit}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </PageContainer>
    </main>
  )
}

export default DetailsPage
