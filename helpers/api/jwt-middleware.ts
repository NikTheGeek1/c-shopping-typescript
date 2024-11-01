import { auth } from '..'

async function jwtMiddleware(req: Request, isJwt: boolean = false): Promise<void> {
  const id = await auth.verifyToken(req, isJwt)
  req.headers.set('userId', id)
}

export { jwtMiddleware }
