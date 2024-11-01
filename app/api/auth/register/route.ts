import joi from 'joi'

import { usersRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

const register = apiHandler(
  async (req: Request): Promise<Response> => {
    const body: RegisterBody = await req.json();

    const result = await usersRepo.create(body);

    return new Response(
      JSON.stringify({
        data: result,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
  },
  {
    schema: joi.object({
      name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().min(6).required(),
    }),
  }
)

export const POST = register
export const dynamic = 'force-dynamic'