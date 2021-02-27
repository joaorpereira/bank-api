import connection from '../database/database'
import { Account } from '../models/AccountModel'
import GenerateId from '../middlewares/generateID'

class AccountsDatabase {
  tableName: string

  constructor(table: string) {
    this.tableName = table
  }

  async getAccounts(): Promise<Account[]> {
    try {
      const response = await connection.raw(`SELECT * FROM ${this.tableName};`)
      return response[0]
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async getAccount(user_id: string): Promise<Account> {
    try {
      const response = await connection.raw(
        `SELECT user_id, user_name, balance FROM ${this.tableName} WHERE user_id="${user_id}";`
      )
      return response[0][0]
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async createAccount(
    user_id: string,
    user_name: string,
    balance?: number
  ): Promise<void> {
    try {
      const id: string = GenerateId.generateId()
      await connection.raw(`
        INSERT INTO ${this.tableName} (id, user_id, user_name, balance) 
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

  async updateAccount(user_id: string, balance: number): Promise<void> {
    try {
      await connection.raw(
        `UPDATE ${this.tableName} SET balance=${balance} WHERE user_id="${user_id}";`
      )
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async deleteAccount(user_id: string): Promise<void> {
    try {
      await connection.raw(
        `DELETE FROM ${this.tableName} WHERE user_id="${user_id}";`
      )
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}

export default new AccountsDatabase('accounts')
