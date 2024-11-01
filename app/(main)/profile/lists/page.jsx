'use client'

import { FavoritesListEmpty, PageContainer, ProfileLayout } from '@/components'
import { useTitle } from '@/hooks'

const Lists = () => {
  useTitle('My Favorites')
  //? Render(s)
  return (
    <main>
      <PageContainer title="My Favorites">
        <section className="py-20">
          <FavoritesListEmpty className="mx-auto h-52 w-52" />
          <p className="text-center">Your favorites list is empty</p>
          <span className="block my-3 text-base text-center text-amber-500">(Coming Soon)</span>
        </section>
      </PageContainer>
    </main>
  )
}

export default Lists
