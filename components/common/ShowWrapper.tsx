import { BigLoading, Button, EmptyCustomList } from '@/components'

interface ShowWrapperProps {
  isError: boolean
  error: any
  refetch: () => void
  isFetching: boolean
  dataLength: number
  isSuccess: boolean
  emptyComponent?: React.ReactNode
  loadingComponent?: React.ReactNode
  children: React.ReactNode
}

export default function ShowWrapper({ isError, error, refetch, isFetching, dataLength, isSuccess, emptyComponent, loadingComponent, children }: ShowWrapperProps) {


  //? Render(s)
  return (
    <section>
      {isError ? (
        <div className="py-20 mx-auto space-y-3 text-center w-fit">
          <h5 className="text-xl">An error occurred</h5>
          <p className="text-lg text-red-500">{error?.data?.err}</p>
            <Button className="mx-auto" onClick={refetch}>
            Retry
            </Button>
        </div>
      ) : isFetching ? (
        <div className="px-3">{loadingComponent || <BigLoading />}</div>
      ) : isSuccess && dataLength > 0 ? (
        <>{children}</>
      ) : isSuccess && dataLength === 0 ? (
        <>{emptyComponent || <EmptyCustomList />}</>
      ) : null}
    </section>
  )
}
