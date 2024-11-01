'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import { useDeleteReviewMutation, useGetReviewsQuery } from '@/store/services'
import {
  ConfirmDeleteModal,
  EmptyCommentsList,
  HandleResponse,
  PageContainer,
  Pagination,
  ReviewCard,
  ReviewSkeleton,
  ShowWrapper,
} from '@/components'
import { useChangeRoute, useDisclosure } from '@/hooks'
import { useState } from 'react'

const Reviews = () => {
  useTitle('My Reviews')
  //? Assets
  const query = useUrlQuery()
  const changeRoute = useChangeRoute()

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  //? States
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })

  //? Queries
  //*    Delete Review
  const [
    deleteReview,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteReviewMutation()

  //*   Get Reviews
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetReviewsQuery({
    page: query.page ? +query.page : 1,
  })

  //? Handlers
  const deleteReviewHandler = id => {
    setDeleteInfo({ id })
    confirmDeleteModalHandlers.open()
  }

  const onConfirmDelete = () => deleteReview({ id: deleteInfo.id })

  const onCancelDelete = () => {
    setDeleteInfo({ id: '' })
    confirmDeleteModalHandlers.close()
  }

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }

  const onErrorDelete = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title={dict.profile?.review?.reviews}
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      {/* Handle Delete Response */}
      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete?.data?.message}
          message={dataDelete?.message}
          onSuccess={onSuccessDelete}
          onError={onErrorDelete}
        />
      )}

      <main id="profileReviews">
        <PageContainer title={dict.profile?.review?.myReviews}>
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data?.data?.reviewsLength : 0}
            emptyComponent={<EmptyCommentsList />}
            loadingComponent={<ReviewSkeleton />}
          >
            <div className="px-4 py-3 space-y-3 ">
              {data &&
                data.data.reviews.map(item => (
                  <ReviewCard
                    deleteReviewHandler={deleteReviewHandler}
                    key={item._id}
                    item={item}
                  />
                ))}
            </div>
          </ShowWrapper>

          {data && data?.data?.reviewsLength > 5 && (
            <div className="py-4 mx-auto lg:max-w-5xl">
              <Pagination
                pagination={data?.data?.pagination}
                changeRoute={changeRoute}
                section="profileReviews"
                client
              />
            </div>
          )}
        </PageContainer>
      </main>
    </>
  )
}

export default Reviews
