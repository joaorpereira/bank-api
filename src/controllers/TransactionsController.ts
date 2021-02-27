import { Request, Response } from 'express'
import { inputTransaction } from '../models/TransactionModel'
import {
  createTransactionView,
  getTransactionsView,
} from '../views/TransactionsView'

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const page = Number(req.query.page) <= 0 ? 1 : Number(req.query.page) || 1
    const transactions = getTransactionsView(token, page)
    res.status(201).send(transactions)
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
    const { user_id, value, type, description }: inputTransaction = req.body
    const message = createTransactionView(
      user_id,
      value,
      type,
      description,
      token
    )
    res.status(201).send(message)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
