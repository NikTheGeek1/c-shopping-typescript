import jwt from 'jsonwebtoken'

const verifyToken = async (req: Request, isJwt: boolean = false) => {
  try {
    const token = req.headers.get('authorization') as string;
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string)
    // @ts-ignore: TODO: figure out why id is not in typescript
    const id = decoded.id
    return new Promise(resolve => resolve(id))
  } catch (error) {
    if (isJwt) {
      throw error
    }
  }
}

const createAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string, {
    expiresIn: '1d',
  })
}

export const auth = {
  verifyToken,
  createAccessToken,
}
