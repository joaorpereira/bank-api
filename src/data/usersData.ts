import connection from '../database/database'
import { User, USER_ROLE } from '../models/UserModel'
class UserDatabase {
  tableName: string

  constructor(table: string) {
    this.tableName = table
  }
  async getUsers(): Promise<User[]> {
    try {
      const response = await connection.raw(`SELECT * FROM ${this.tableName};`)
      return response[0]
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async getUserByID(id: string): Promise<User> {
    try {
      const response = await connection.raw(
        `SELECT * FROM ${this.tableName} WHERE id="${id}"`
      )
      return response[0][0]
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const response = await connection.raw(
        `SELECT * FROM ${this.tableName} WHERE email="${email}"`
      )
      return response[0][0]
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async signUp(
    id: string,
    name: string,
    password: string,
    email: string,
    cpf: string,
    date_of_birth: Date,
    is_admin: USER_ROLE
  ): Promise<void> {
    try {
      await connection.raw(`
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
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async deletedUser(id: string): Promise<void> {
    try {
      await connection.raw(`DELETE FROM ${this.tableName} WHERE id="${id}";`)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  async updatedUser(id: string, name: string, password: string): Promise<void> {
    try {
      await connection.raw(
        `UPDATE ${this.tableName} SET name="${name}", password="${password}" WHERE id="${id}";`
      )
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}

export default new UserDatabase('users')
