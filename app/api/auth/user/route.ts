import joi from 'joi'

import { usersRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

const getUertInfo = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const user = await usersRepo.getById(userId as string)
    return setJson({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        root: user.root,
        address: user.address,
        mobile: user.mobile,
      },
    })
  },
  {
    isJwt: true,
  }
)

export const GET = getUertInfo
export const dynamic = 'force-dynamic'
