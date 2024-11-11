import { apiHandler, setJson } from '@/helpers/api'
import { STS } from 'ali-oss'
import { NextRequest } from 'next/server';

const storeSTS = new STS({
  accessKeyId: process.env.NEXT_PUBLIC_ALI_ACCESS_KEY as string,
  accessKeySecret: process.env.NEXT_PUBLIC_ALI_SECRET_KEY as string,
})

const getToken = apiHandler(
  async (req: NextRequest) => {
    try {
      const result = await storeSTS.assumeRole(
        process.env.NEXT_PUBLIC_ALI_ACS_RAM_NAME as string,
        '',
        3000,
        'sessiontest'
      );
      return setJson({
        data: { ...result.credentials },
      });
    } catch (e: any) {
      console.log("Error trying to get token:", e);
      return setJson({ message: e.message, code: 500 })
    }
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

export const GET = getToken
export const dynamic = 'force-dynamic'
