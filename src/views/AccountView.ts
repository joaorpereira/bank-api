// import { databaseAccounts, databaseGetAccount } from '../data/accountsData'
import AccountsDatabase from '../data/AccountsDatabase'
import GenerateAuthToken from '../middlewares/generateToken'
import { Account } from '../models/AccountModel'
import { AuthToken } from '../models/TokenModal'

class AccountsView {
  async getAccounts(token: string): Promise<Account[]> {
    let message = 'Accounts not found'
    let statusCode

    try {
      const tokenData: AuthToken = GenerateAuthToken.getTokenData(token)
      if (!token || tokenData.is_admin !== 'ADMIN') {
        statusCode = 401
        message = 'Not authorized'
        throw new Error(message)
      }

      const accounts: Account[] = await AccountsDatabase.getAccounts()
      if (!accounts.length) {
        statusCode = 404
        throw new Error(message)
      }

      return accounts
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAccount(id: string, token: string): Promise<Account> {
    let message = 'Account balance not found'
    let statusCode

    try {
      if (!token) {
        statusCode = 400
        message = 'Not authorized'
        throw new Error(message)
      }
      const balance = await AccountsDatabase.getAccount(id)
      return balance
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new AccountsView()
