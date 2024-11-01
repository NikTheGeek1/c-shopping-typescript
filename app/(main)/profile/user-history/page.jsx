'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle } from '@/hooks'
import { EmptyCart, PageContainer, ResponsiveImage } from '@/components'
import { useAppSelector } from '@/hooks'
import Link from 'next/link'
import { truncate } from 'utils'

const UserHistory = () => {
  useTitle('Recently Viewed')
  //? Store
  const { lastSeen } = useAppSelector(state => state.user)

  //? Dictionary
  const { dict } = useLanguageContext()

  //? selector
  return (
    <main>
      <PageContainer title={dict.profile?.userHistory?.viewed}>
        {lastSeen.length > 0 ? (
          <div className="px-3 space-y-4 md:py-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-2 lg:grid-cols-3 md:gap-y-3">
            {lastSeen.map(item => (
              <article
                className="border-b md:hover:shadow-3xl md:h-64 md:border-0 "
                key={item.productID}
              >
                <Link
                  href={`/products/${item.productID}`}
                  className="flex items-center gap-4 py-4 md:items-start md:flex-col"
                >
                  <ResponsiveImage
                    dimensions="w-36 h-36"
                    className="md:mx-auto"
                    src={item.image.url}
                    alt={item.title}
                  />

                  <h5 className="flex-1 px-3 text-left text-gray-800 leading-6 md:h-32">
                    {truncate(item.title, 80)}
                  </h5>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <section className="py-20">
            <EmptyCart className="mx-auto h-52 w-52" />
            <p className="text-center">{dict.profile?.userHistory?.empty}</p>
          </section>
        )}
      </PageContainer>
    </main>
  )
}

export default UserHistory
