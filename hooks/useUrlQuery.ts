import { useSearchParams } from 'next/navigation'

type QueryParams = { [key: string]: string | number | undefined }

export default function useUrlQuery(): QueryParams {
  const searchParams = useSearchParams()
  const query: QueryParams = {}
  
  searchParams.forEach((value, key) => {
    query[key] = value
  })

  return query
}
