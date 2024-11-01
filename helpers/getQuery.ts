import { NextRequest } from "next/server"

export const getQuery = (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  let query = {}
  searchParams.forEach((value, key) => {
    // @ts-ignore TODO: typescript
    query[key] = value
  })
  return query
}
