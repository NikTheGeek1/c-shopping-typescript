import { apiHandler, setJson } from '@/helpers/api'
import { STS } from 'ali-oss'

const storeSTS = new STS({
  accessKeyId: process.env.NEXT_PUBLIC_ALI_ACCESS_KEY,
  accessKeySecret: process.env.NEXT_PUBLIC_ALI_SECRET_KEY,
})

const getToken = apiHandler(async req => {
    try {
      const result = await storeSTS.assumeRole(
        process.env.NEXT_PUBLIC_ALI_ACS_RAM_NAME,
        '',
        '3000',
        'sessiontest'
      );
      return setJson({
        data: { ...result.credentials },
      });
    } catch (e) {
      console.log("Error trying to get token:", e);
      return setJson({ error: e.message }, 500)
    }
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

export const GET = getToken
export const dynamic = 'force-dynamic'
