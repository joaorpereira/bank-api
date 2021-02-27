import { databaseAccounts, databaseGetAccount } from '../data/accountsData'
import { AuthToken, getTokenData } from '../middlewares/generateToken'
import { Account } from '../models/AccountModel'

export const getAccountsView = async (token: string): Promise<Account[]> => {
  const tokenData: AuthToken = getTokenData(token)

  let message = 'Accounts not found'
  let statusCode

  if (!token || tokenData.is_admin !== 'ADMIN') {
    statusCode = 401
    message = 'Not authorized'
    throw new Error(message)
  }

  const accounts: Account[] = await databaseAccounts()
  if (!accounts.length) {
    statusCode = 404
    throw new Error(message)
  }

  return accounts
}

export const getAccountView = async (
  id: string,
  token: string
): Promise<Account> => {
  let message = 'Account balance not found'
  let statusCode

  if (!token) {
    statusCode = 400
    message = 'Not authorized'
    throw new Error(message)
  }

  const balance = await databaseGetAccount(id)
  if (!balance) {
    statusCode = 404
    throw new Error(message)
  }

  return balance
}
