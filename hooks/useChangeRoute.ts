import { useRouter, usePathname, useSearchParams } from 'next/navigation'
interface QueryParams {
  [key: string]: string | undefined;
}

export default function useChangeRoute() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  let query: QueryParams = {}
  searchParams.forEach((value, key) => {
    query[key] = value
  })

  const changeRoute = (newQueries: QueryParams) => {
    const queryParams = new URLSearchParams()
    Object.entries({ ...query, ...newQueries }).forEach(([key, value]) => {
      if (value) queryParams.set(key, value)
    })

    replace(`${pathname}?${queryParams.toString()}`, { scroll: false })
  }

  return changeRoute
}
