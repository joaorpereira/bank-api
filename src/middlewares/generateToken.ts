import * as jwt from 'jsonwebtoken'
import { AuthToken } from '../models/TokenModal'
class GenerateAuthToken {
  public generateToken(payload: AuthToken): string {
    const newToken = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: '24h',
    })
    return newToken
  }

  public getTokenData(token: string): AuthToken {
    if(!token){
      throw new Error('Invalid token')
    }
    const newToken = token.split(' ')[1]
    const tokenData = jwt.verify(newToken, process.env.JWT_KEY as string)
    return tokenData as AuthToken
  }
}

export default new GenerateAuthToken()
