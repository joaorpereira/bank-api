import { databaseGetAccount, databaseUpdateAccount } from '../data/accountsData'
import {
  databaseCreateTransaction,
  databaseTransactions,
} from '../data/transactionsData'
import generateId from '../middlewares/generateID'
import { AuthToken, getTokenData } from '../middlewares/generateToken'
import { Transaction, Types } from '../models/TransactionModel'

export const getTransactionsView = async (
  token: string,
  page: number
): Promise<Transaction[]> => {
  const tokenData: AuthToken = getTokenData(token)

  let message = 'Transactions not found'
  let statusCode

  if (!token || tokenData.is_admin !== 'ADMIN') {
    statusCode = 401
    message = 'Not authorized'
    throw new Error(message)
  }

  const transactions: Transaction[] = await databaseTransactions(page)
  if (!transactions.length) {
    statusCode = 404
    throw new Error(message)
  }

  return transactions
}

export const createTransactionView = async (
  user_id: string,
  value: number,
  type: string,
  description: string,
  token: string
): Promise<string> => {
  let message = 'Account balance not found'
  let statusCode

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

  const id = generateId()

  let { balance } = await databaseGetAccount(user_id)

  if (type === 'OUTCOME' && balance <= value) {
    throw new Error('Insufficient account balance')
  } else if (value && type === 'INCOMME') {
    balance += value
  } else if (value && type === 'OUTCOME') {
    balance -= value
  }

  await databaseCreateTransaction(
    id,
    user_id,
    value,
    type as Types,
    description
  )
  await databaseUpdateAccount(user_id, balance)

  message = 'Transaction created'

  return message
}
