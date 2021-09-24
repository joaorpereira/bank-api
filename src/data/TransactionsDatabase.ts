import DataBase from '../database/DataBase'
import { Transaction, Types } from '../models/TransactionModel'
class TransactionsDatabase extends DataBase {
  private tableName: string = 'transactions'

  async get(page: Number): Promise<Transaction[]> {
    try {
      const resultPage: number = 5
      const offset: number = resultPage * ((page as number) - 1)
      const response = await DataBase.connection.raw(
        `SELECT * FROM ${this.tableName} LIMIT ${resultPage} OFFSET ${offset};`
      )
      return response[0]
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async create(
    id: string,
    user_id: string,
    value: number,
    type: Types,
    description: string
  ): Promise<void> {
    try {
      await DataBase.connection.raw(`
        INSERT INTO ${this.tableName} (id, user_id, value, type, description) 
        VALUES ( 
          "${id}", 
          "${user_id}", 
          ${value}, 
          "${type}", 
          "${description}"
        );    
      `)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async delete(user_id: string): Promise<void> {
    try {
      await DataBase.connection.raw(
        `DELETE FROM ${this.tableName} WHERE user_id="${user_id}";`
      )
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}

export default new TransactionsDatabase()
