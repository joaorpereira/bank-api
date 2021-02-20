import { Request, Response } from 'express'
import { databaseGetAccount, databaseGetAccounts } from '../data/accountsData'
import { AuthToken, getTokenData } from '../middlewares/generateToken'
import { Account } from '../models/AccountModel'

export const getAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const tokenData: AuthToken = getTokenData(token)

    let message = 'Accounts not found'

    if (!token || tokenData.is_admin !== 'ADMIN') {
      res.statusCode = 401
      message = 'Not authorized'
      throw new Error(message)
    }

    const accounts: Account[] = await databaseGetAccounts()
    if (!accounts.length) {
      res.status(404).send(message)
    }
    res.status(200).send(accounts)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const getAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const token: string = req.headers.authorization as string
    let message = 'Account balance not found'

    if (!token) {
      res.statusCode = 400
      message = 'Not authorized'
      throw new Error(message)
    }

    const { id } = req.params
    const balance = await databaseGetAccount(id)
    if (!balance) {
      res.status(404).send(message)
    }
    res.status(200).send(balance)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
