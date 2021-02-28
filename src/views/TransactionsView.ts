import HashManager from '../middlewares/generateID'
import AccountsDatabase from '../data/AccountsDatabase'
import TransactionsDatabase from '../data/TransactionsDatabase'
import GenerateAuthToken from '../middlewares/generateToken'
import { Transaction, Types } from '../models/TransactionModel'
import { AuthToken } from '../models/TokenModal'

class TransactionsView {
  async getTransactions(token: string, page: number): Promise<Transaction[]> {
    try {
      const tokenData: AuthToken = GenerateAuthToken.getTokenData(token)

      let message = 'Transactions not found'
      let statusCode

      if (!token || tokenData.is_admin !== 'ADMIN') {
        statusCode = 401
        message = 'Not authorized'
        throw new Error(message)
      }

      const transactions: Transaction[] = await TransactionsDatabase.getTransactions(
        page
      )
      if (!transactions.length) {
        statusCode = 404
        throw new Error(message)
      }

      return transactions
    } catch (error) {
      throw new Error(error)
    }
  }

  async createTransaction(
    user_id: string,
    value: number,
    type: string,
    description: string,
    token: string
  ): Promise<string> {
    let message = 'Account balance not found'
    let statusCode

    try {
      if (!token) {
        statusCode = 400
        message = 'Not authorized'
        throw new Error(message)
      }

      if (!(type in Types)) {
        statusCode = 406
        message = 'Invalid transactions type'
        throw new Error(message)
      }

      const id = HashManager.generateId()

      let { balance } = await AccountsDatabase.getAccount(user_id)

      if (type === 'OUTCOME' && balance <= value) {
        throw new Error('Insufficient account balance')
      } else if (value && type === 'INCOMME') {
        balance += value
      } else if (value && type === 'OUTCOME') {
        balance -= value
      }

      await TransactionsDatabase.createTransaction(
        id,
        user_id,
        value,
        type as Types,
        description
      )
      await AccountsDatabase.updateAccount(user_id, balance)

      message = 'Transaction created'

      return message
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new TransactionsView()
