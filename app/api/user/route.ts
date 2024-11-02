import joi from 'joi'
import { NextRequest } from 'next/server'

import { usersRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

interface SearchParams {
  page: number;
  page_size: number;
}

const getUsers = apiHandler(
  async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const page = +(searchParams.get('page') || 1)
    const page_size = +(searchParams.get('page_size') || 5)

    const result = await usersRepo.getAll({
      page,
      page_size,
    } as SearchParams)
    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

const uploadInfo = apiHandler(
  async (req: NextRequest) => {
    const userId = req.headers.get('userId') as string
    const body = await req.json()

    const result = await usersRepo.update(userId, body)
    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
    schema: joi.object({
      name: joi.string(),
      address: joi.object(),
      mobile: joi.string(),
    }),
  }
)

export const GET = getUsers
export const PATCH = uploadInfo
export const dynamic = 'force-dynamic'
