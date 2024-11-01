import { NextResponse } from 'next/server'
import { NextRequest, NextFetchEvent } from 'next/server'
import { errorHandler, jwtMiddleware, validateMiddleware, identityMiddleware } from '.'

export { apiHandler }

function isPublicPath(req: NextRequest): boolean {
  // public routes that don't require authentication
  const publicPaths = ['POST:/api/auth/login', 'POST:/api/auth/logout', 'POST:/api/auth/register']
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}

interface ApiHandlerOptions {
  identity?: any;
  schema?: any;
  isJwt?: boolean;
}

type Handler = (req: NextRequest, ...args: any[]) => Promise<any>;

function apiHandler(handler: Handler, options: ApiHandlerOptions = {}) {
  return async (req: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const { identity, schema, isJwt } = options;
    try {
      if (!isPublicPath(req)) {
        // global middleware
        await jwtMiddleware(req, isJwt)
        await identityMiddleware(req, identity, isJwt)
        await validateMiddleware(req, schema)
      }
      // route handler
      const responseBody = await handler(req, ...args)
      return NextResponse.json(responseBody || {})
    } catch (err: any) {
      console.log('global error handler', err)
      // global error handler
      return errorHandler(err)
    }
  }
}
