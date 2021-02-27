import { Account } from '../models/AccountModel'
import GenerateId from '../middlewares/generateID'
import DataBase from '../database/DataBase'
class AccountsDatabase extends DataBase {
  private tableName: string = 'accounts'

  async getAccounts(): Promise<Account[]> {
    try {
      const response = await DataBase.connection.raw(
        `SELECT * FROM ${this.tableName};`
      )
      return response[0]
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async getAccount(user_id: string): Promise<Account> {
    try {
      const response = await DataBase.connection.raw(
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
      await DataBase.connection.raw(`
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
      await DataBase.connection.raw(
        `UPDATE ${this.tableName} SET balance=${balance} WHERE user_id="${user_id}";`
      )
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async deleteAccount(user_id: string): Promise<void> {
    try {
      await DataBase.connection.raw(
        `DELETE FROM ${this.tableName} WHERE user_id="${user_id}";`
      )
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}

export default new AccountsDatabase()
