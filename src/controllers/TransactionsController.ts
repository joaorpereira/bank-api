import { Request, Response } from 'express'
import { InputTransaction } from '../models/TransactionModel'
import TransactionsView from '../views/TransactionsView'
class TransactionsController {
  async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string
      const page = Number(req.query.page) <= 0 ? 1 : Number(req.query.page) || 1
      const transactions = await TransactionsView.getTransactions(token, page)
      res.status(201).send(transactions)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string
      const { user_id, value, type, description }: InputTransaction = req.body
      const message = await TransactionsView.createTransaction(
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
}

export default new TransactionsController()
