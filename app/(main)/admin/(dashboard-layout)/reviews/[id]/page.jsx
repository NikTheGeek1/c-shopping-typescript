'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle } from '@/hooks'
import { useGetSingleReviewQuery } from '@/store/services'
import { BigLoading, PageContainer, ReviewCard } from '@/components'

const SingleCommentPage = ({ params: { id } }) => {
  // ? Dictionary
  const { dict } = useLanguageContext()

  useTitle(dict.admin ? dict.admin.review.details : 'Review Details')

  //? Get Single Review Data
  const { data, isLoading } = useGetSingleReviewQuery({
    id,
  })

  //? Render(s)
  return (
    <main>
      <PageContainer title={dict.admin.review.details}>
        {isLoading ? (
          <div className="px-3 py-20">
            <BigLoading />
          </div>
        ) : data ? (
          <section className="px-3 py-3 mx-auto lg:px-8">
            <ReviewCard singleComment item={data.data} />
          </section>
        ) : null}
      </PageContainer>
    </main>
  )
}

export default SingleCommentPage
