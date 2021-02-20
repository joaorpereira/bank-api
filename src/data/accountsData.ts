import connection from '../database/database'
import { Account } from '../models/AccountModel'
import generateId from '../middlewares/generateID'

export async function databaseGetAccounts(): Promise<Account[]> {
  try {
    const response = await connection.raw(`SELECT * FROM accounts;`)
    return response[0]
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseGetAccount(user_id: string): Promise<Account> {
  try {
    const response = await connection.raw(
      `SELECT user_id, user_name, balance FROM accounts WHERE user_id="${user_id}";`
    )
    return response[0][0]
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseCreateAccount(
  user_id: string,
  user_name: string,
  balance?: number
): Promise<void> {
  try {
    const id : string = generateId()
    await connection.raw(`
      INSERT INTO accounts (id, user_id, user_name, balance) 
      VALUES ( 
        "${id}", 
        "${user_id}", 
        "${user_name}", 
        ${balance || 0}
      );    
    `)
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseUpdateAccount(
  user_id: string,
  balance: number
): Promise<void> {
  try {
    await connection.raw(
      `UPDATE accounts SET balance=${balance} WHERE user_id="${user_id}";`
    )
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseDeleteAccount(user_id: string): Promise<void> {
  try {
    await connection.raw(`DELETE FROM accounts WHERE user_id="${user_id}";`)
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}
