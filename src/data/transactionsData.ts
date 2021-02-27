import connection from '../database/database'
import { Transaction, Types } from '../models/TransactionModel'

class TransactionsDatabase {
  tableName: string

  constructor(table: string) {
    this.tableName = table
  }

  async getTransactions(page: Number): Promise<Transaction[]> {
    try {
      const resultPage: number = 5
      const offset: number = resultPage * ((page as number) - 1)
      const response = await connection.raw(
        `SELECT * FROM ${this.tableName} LIMIT ${resultPage} OFFSET ${offset};`
      )
      return response[0]
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async createTransaction(
    id: string,
    user_id: string,
    value: number,
    type: Types,
    description: string
  ): Promise<void> {
    try {
      await connection.raw(`
        INSERT INTO ${this.tableName} (id, user_id, value, type, description) 
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

  async deleteTransaction(user_id: string): Promise<void> {
    try {
      await connection.raw(
        `DELETE FROM ${this.tableName} WHERE user_id="${user_id}";`
      )
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}

export default new TransactionsDatabase('transactions')
