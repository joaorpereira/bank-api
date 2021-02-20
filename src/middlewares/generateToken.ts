import * as jwt from 'jsonwebtoken'
import { USER_ROLE } from '../models/UserModel'

export type AuthToken = {
  id: string
  is_admin: USER_ROLE
}

function generateToken(payload: AuthToken): string {
  const newToken = jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn: '24h',
  })
  return newToken
}

function getTokenData(token: string): AuthToken {
  const tokenData = jwt.verify(token, process.env.JWT_KEY as string)
  return tokenData as AuthToken
}

export { generateToken, getTokenData }
