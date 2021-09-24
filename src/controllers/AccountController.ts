import { Request, Response } from 'express'
import AccountsView from '../views/AccountView'
class AccountController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string
      const accounts = await AccountsView.getAll(token)
      res.status(200).send(accounts)
    } catch (error: any) {
      res.status(400).send(error.message)
    }
  }

  async get(req: Request, res: Response): Promise<any> {
    try {
      const token: string = req.headers.authorization as string
      const { id } = req.params
      const balance = await AccountsView.get(id, token)
      res.status(200).send(balance)
    } catch (error: any) {
      res.status(400).send(error.message)
    }
  }
}

export default new AccountController()
