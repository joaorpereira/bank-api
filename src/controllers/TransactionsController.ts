import { Request, Response } from "express";
import { InputTransaction } from "../models/TransactionModel";
import TransactionsView from "../business/TransactionsView";
class TransactionsController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string;
      const page = Number(req.query.page) <= 0 ? 1 : Number(req.query.page) || 1;
      const transactions = await TransactionsView.getAll(token, page);
      res.status(201).send(transactions);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string;
      const { user_id, value, type, description }: InputTransaction = req.body;
      const message = await TransactionsView.create(user_id, value, type, description, token);
      res.status(201).send(message);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}

export default new TransactionsController();
