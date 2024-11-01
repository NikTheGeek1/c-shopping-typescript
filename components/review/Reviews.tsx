import { useGetProductReviewsQuery } from '@/store/services'

import {
  Pagination,
  Icons,
  ShowWrapper,
  EmptyComment,
  ReviewModal,
  ReviewSkeleton,
  ReviewProductCard,
  RedirectToLogin,
} from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'

import { useUrlQuery, useUserInfo, useDisclosure, useChangeRoute } from '@/hooks'

interface ReviewsProps {
  numReviews: number
  prdouctID: string
  productTitle: string
}

const Reviews = ({ numReviews, prdouctID, productTitle }: ReviewsProps) => {

  //? Assets
  const query = useUrlQuery()
  const changeRoute = useChangeRoute()
  const page = query.page ? +query.page : 1

  const { isVerify } = useUserInfo()
  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()

  //? Modals
  const [isShowReviewModal, reviewModalHandlers] = useDisclosure()

  //? Get Product-Reviews Query
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetProductReviewsQuery(
    {
      id: prdouctID,
      page,
    },
    { skip: numReviews > 0 ? false : true }
  )

  //? Handlers
  const handleOpenCommentModal = () => {
    if (!isVerify) return redirectModalHandlers.open()
    reviewModalHandlers.open()
  }

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <>
      <RedirectToLogin
        title={dict.header?.notLogged}
        text=""
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
      <ReviewModal
        isShow={isShowReviewModal}
        onClose={reviewModalHandlers.close}
        productTitle={productTitle}
        prdouctID={prdouctID}
      />
      <section className="px-3 py-3 space-y-4 lg:max-w-3xl xl:max-w-5xl" id="_productReviews">
        <div className="flex items-center justify-between">
          <h4 className="mb-3 lg:border-b-2 lg:border-red-500">{dict.profile?.review?.product}</h4>
          <span className="text-xs text-sky-500">
            {numReviews} {dict.profile?.review?.number}
          </span>
        </div>
        <div className="lg:ml-10">
          <div className="mb-8">
            <button
              type="button"
              onClick={handleOpenCommentModal}
              className="flex items-center w-full gap-x-5"
            >
              <Icons.Comment className="icon" />
              <span className="text-sm text-black ">{dict.profile?.review?.write}</span>
              <Icons.ArrowRight2 className="ml-auto icon" />
            </button>
            <p className="mt-6 text-xs text-gray-500">{dict.profile?.review?.submit}</p>
          </div>

          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data?.data?.reviewsLength : 0}
            emptyComponent={<EmptyComment />}
            loadingComponent={<ReviewSkeleton />}
          >
            <div className="py-3 space-y-4 divide-y-2 lg:px-6 sm:px-2">
              {data?.data?.reviews?.map(item => <ReviewProductCard item={item} key={item._id} />)}
            </div>
          </ShowWrapper>

          {data && data?.data?.reviewsLength > 5 && (
            <div className="py-4 mx-auto lg:max-w-5xl">
              <Pagination
                pagination={data?.data?.pagination}
                changeRoute={changeRoute}
                section="_productReviews"
                client
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Reviews
