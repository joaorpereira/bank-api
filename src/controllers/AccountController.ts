import { Request, Response } from 'express'
import { getAccountsView, getAccountView } from '../views/AccountView'

export const getAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const accounts = getAccountsView(token)
    res.status(200).send(accounts)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const getAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const token: string = req.headers.authorization as string
    const { id } = req.params
    const balance = getAccountView(id, token)
    res.status(200).send(balance)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
