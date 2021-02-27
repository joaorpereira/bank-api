import { Request, Response } from 'express'
import AccountsView from '../views/AccountView'
class AccountController {
  async getAccounts(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string
      const accounts = await AccountsView.getAccounts(token)
      res.status(200).send(accounts)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async getAccount(req: Request, res: Response): Promise<any> {
    try {
      const token: string = req.headers.authorization as string
      const { id } = req.params
      const balance = await AccountsView.getAccount(id, token)
      res.status(200).send(balance)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

export default new AccountController()
