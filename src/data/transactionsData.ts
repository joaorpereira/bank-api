import connection from '../database/database'
import { Transaction, Types } from '../models/TransactionModel'

export async function databaseTransactions(
  page: Number
): Promise<Transaction[]> {
  try {
    const resultPage: number = 5
    const offset: number = resultPage * ((page as number) - 1)
    const response = await connection.raw(
      `SELECT * FROM transactions LIMIT ${resultPage} OFFSET ${offset};`
    )
    return response[0]
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseCreateTransaction(
  id: string,
  user_id: string,
  value: number,
  type: Types,
  description: string
): Promise<void> {
  try {
    await connection.raw(`
      INSERT INTO transactions (id, user_id, value, type, description) 
      VALUES ( 
        "${id}", 
        "${user_id}", 
        ${value}, 
        "${type}", 
        "${description}"
      );    
    `)
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseDeleteTransaction(user_id: string): Promise<void> {
  try {
    await connection.raw(`DELETE FROM transactions WHERE user_id="${user_id}";`)
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}
