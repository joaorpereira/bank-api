import DataBase from '../database/DataBase'
import { User, USER_ROLE } from '../models/UserModel'
class UserDatabase extends DataBase {
  private tableName: string = 'users'

  async getAll(): Promise<User[]> {
    try {
      const response = await DataBase.connection.raw(
        `SELECT * FROM ${this.tableName};`
      )
      return response[0]
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async get(id: string): Promise<User> {
    try {
      const response = await DataBase.connection.raw(
        `SELECT * FROM ${this.tableName} WHERE id="${id}"`
      )
      return response[0][0]
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const response = await DataBase.connection.raw(
        `SELECT * FROM ${this.tableName} WHERE email="${email}"`
      )
      return response[0][0]
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async create(
    id: string,
    name: string,
    password: string,
    email: string,
    cpf: string,
    date_of_birth: Date,
    is_admin: USER_ROLE
  ): Promise<void> {
    try {
      await DataBase.connection.raw(`
      INSERT INTO ${this.tableName} (id, name, password, email, cpf, date_of_birth, is_admin) 
      VALUES ( 
        "${id}", 
        "${name}", 
        "${password}", 
        "${email}", 
        "${cpf}", 
        "${date_of_birth}",
        "${is_admin}"
      );    
    `)
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await DataBase.connection.raw(
        `DELETE FROM ${this.tableName} WHERE id="${id}";`
      )
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async update(id: string, name: string, password: string): Promise<void> {
    try {
      await DataBase.connection.raw(
        `UPDATE ${this.tableName} SET name="${name}", password="${password}" WHERE id="${id}";`
      )
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}

export default new UserDatabase()
