import connection from '../database/database'
import { User, USER_ROLE } from '../models/UserModel'

export async function databaseUsers(): Promise<User[]> {
  try {
    const response = await connection.raw(`SELECT * FROM users;`)
    return response[0]
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseUserByID(id: string): Promise<User> {
  try {
    const response = await connection.raw(
      `SELECT * FROM users WHERE id="${id}"`
    )
    return response[0][0]
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseUserByEmail(email: string): Promise<User> {
  try {
    const response = await connection.raw(
      `SELECT * FROM users WHERE email="${email}"`
    )
    return response[0][0]
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseSignUp(
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
    INSERT INTO users (id, name, password, email, cpf, date_of_birth, is_admin) 
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

export async function databaseDeletedUser(id: string): Promise<void> {
  try {
    await connection.raw(`DELETE FROM users WHERE id="${id}";`)
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}

export async function databaseUpdatedUser(
  id: string,
  name: string,
  password: string
): Promise<void> {
  try {
    await connection.raw(
      `UPDATE users SET name="${name}", password="${password}" WHERE id="${id}";`
    )
  } catch (error) {
    throw new Error(error.sqlMessage || error.message)
  }
}
