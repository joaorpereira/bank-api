// import { databaseAccounts, databaseGetAccount } from '../data/accountsData'
import AccountsDatabase from '../data/AccountsDatabase'
import GenerateAuthToken from '../middlewares/generateToken'
import { Account } from '../models/AccountModel'
import { AuthToken } from '../models/TokenModal'

class AccountsView {
  async getAll(token: string): Promise<Account[]> {
    let message = 'Accounts not found'
    let statusCode

    try {
      const tokenData: AuthToken = GenerateAuthToken.getTokenData(token)
      if (!token || tokenData.is_admin !== 'ADMIN') {
        statusCode = 401
        message = 'Not authorized'
        throw new Error(message)
      }

      const accounts: Account[] = await AccountsDatabase.getAll()
      if (!accounts.length) {
        statusCode = 404
        throw new Error(message)
      }

      return accounts
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async get(id: string, token: string): Promise<Account> {
    let message = 'Account balance not found'
    let statusCode

    try {
      if (!token) {
        statusCode = 400
        message = 'Not authorized'
        throw new Error(message)
      }
      const balance = await AccountsDatabase.get(id)
      return balance
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default new AccountsView()
