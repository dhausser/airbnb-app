import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'
import { NextApiResponse, NextApiRequest } from 'next'
import { SessionOptions } from 'http2'

const TOKEN_SECRET: string | undefined = process.env.TOKEN_SECRET

export async function setLoginSession(res: NextApiResponse, session: SessionOptions): Promise<void> {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET as string, Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession(req: NextApiRequest): Promise<SessionOptions | undefined> {
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET as string, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() < expiresAt) {
    return session
  }
}
