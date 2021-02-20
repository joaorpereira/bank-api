import { Request, Response } from 'express'
import { databaseGetAccount, databaseUpdateAccount } from '../data/accountsData'
import {
  databaseCreateTransaction,
  databaseTransactions,
} from '../data/transactionsData'
import {
  inputTransaction,
  Transaction,
  Types,
} from '../models/TransactionModel'
import generateId from '../middlewares/generateID'
import { AuthToken, getTokenData } from '../middlewares/generateToken'

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const tokenData: AuthToken = getTokenData(token)

    let message = 'Transactions not found'

    if (!token || tokenData.is_admin !== 'ADMIN') {
      res.statusCode = 401
      message = 'Not authorized'
      throw new Error(message)
    }

    const page = Number(req.query.page) <= 0 ? 1 : Number(req.query.page) || 1
    const transaction: Transaction[] = await databaseTransactions(page)
    if (!transaction.length) {
      res.status(404).send(message)
    }
    res.status(201).send(transaction)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const token: string = req.headers.authorization as string
    let message = 'Account balance not found'

    if (!token) {
      res.statusCode = 400
      message = 'Not authorized'
      throw new Error(message)
    }

    const { user_id, value, type, description }: inputTransaction = req.body

    if (!(type in Types)) {
      res.status(406).send('Invalid transactions type')
    }

    const id = generateId()

    let { balance } = await databaseGetAccount(user_id)

    if (type === 'OUTCOME' && balance <= value) {
      throw new Error('Insufficient account balance')
    } else if (value && type === 'INCOMME') {
      balance += value
    } else if (value && type === 'OUTCOME') {
      balance -= value
    }

    await databaseCreateTransaction(id, user_id, value, type, description)
    await databaseUpdateAccount(user_id, balance)
    res.status(201).send('Transaction created')
  } catch (error) {
    res.status(400).send(error.message)
  }
}
