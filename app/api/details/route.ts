import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { detailsRepo } from '@/helpers'

const getAllDetails = apiHandler(
  async (req: Request) => {
    const result = await detailsRepo.getAll()
    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

const createDetails = apiHandler(
  async (req: Request) => {
    const body = await req.json()
    await detailsRepo.create(body)
    return setJson({
      message: 'Product added successfully',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: joi.object({
      category_id: joi.string().required(),
      info: joi.array().required(),
      optionsType: joi.string().required(),
      specification: joi.array().required(),
    }),
  }
)

export const GET = getAllDetails
export const POST = createDetails
export const dynamic = 'force-dynamic'
