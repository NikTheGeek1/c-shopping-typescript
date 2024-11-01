'use client'

import { FavoritesListEmpty, PageContainer } from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle } from '@/hooks'

const Lists = () => {
  useTitle('My Favorites')

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <main>
      <PageContainer title={dict.profile?.list?.title}>
        <section className="py-20">
          <FavoritesListEmpty className="mx-auto h-52 w-52" />
          <p className="text-center">{dict.profile?.list?.empty}</p>
          <span className="block my-3 text-base text-center text-amber-500">
            {dict.profile?.list?.soon}
          </span>
        </section>
      </PageContainer>
    </main>
  )
}

export default Lists
