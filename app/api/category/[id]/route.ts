import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { categoryRepo } from '@/helpers'

interface Params {
  id: string;
}

const deleteCategory = apiHandler(
  async (req: Request, { params }: { params: Params }) => {
    const { id } = params
    await categoryRepo.delete(id)
    return setJson({
      message: 'Category deleted successfully',
    })
  },
  {
    isJwt: true,
    identity: 'root',
  }
)

const updateCategory = apiHandler(
  async (req: Request, { params }: { params: Params }) => {
    const { id } = params
    const body = await req.json()
    await categoryRepo.update(id, body)
    return setJson({
      message: 'Category updated successfully',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: joi.object({
      name: joi.string().required(),
      slug: joi.string().required(),
      image: joi.string().required(),
      colors: joi.object(),
      level: joi.number().required(),
      parent: joi.string(),
    }),
  }
)

export const DELETE = deleteCategory
export const PUT = updateCategory
export const dynamic = 'force-dynamic'
