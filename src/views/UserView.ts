import HashManager from '../middlewares/generateHash'
import UserDatabase from '../data/UsersData'
import GenerateId from '../middlewares/generateID'
import GenerateAuthToken from '../middlewares/generateToken'
import AccountsDatabase from '../data/AccountsDatabase'
import TransactionsDatabase from '../data/TransactionsDatabase'
import { User, USER_ROLE } from '../models/UserModel'
import { AuthToken } from '../models/TokenModal'
class UserView {
  async getAll(token: string): Promise<User[]> {
    let message = 'Users not found'
    let statusCode

    try {
      const tokenData = GenerateAuthToken.getTokenData(token)

      if (!token || tokenData.is_admin !== 'ADMIN') {
        statusCode = 401
        message = 'Not authorized'
        throw new Error(message)
      }

      const users: User[] = await UserDatabase.getAll()

      if (!users.length) {
        statusCode = 404
        throw new Error(message)
      }

      return users
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async get(token: string, id: string): Promise<User> {
    let message = 'User not found'
    let statusCode
    try {
      if (!token) {
        statusCode = 400
        message = 'Not authorized'
        throw new Error(message)
      }

      const user: User = await UserDatabase.get(id)
      if (!user) {
        statusCode = 404
        throw new Error(message)
      }

      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async login(email: string, password: string): Promise<string> {
    let message = 'User logged'
    let statusCode

    try {
      if (!email || !password) {
        statusCode = 406
        message = 'Email and password are required'
        throw new Error(message)
      }

      const user: User = await UserDatabase.getByEmail(email)
      const token: string = GenerateAuthToken.generateToken({
        id: user.id,
        is_admin: user.is_admin,
      })

      const comparePassword: boolean = await HashManager.compare(
        password,
        user.password
      )

      if (!user) {
        statusCode = 404
        message = 'User not found or incorrect password'
        throw new Error(message)
      }

      if (!comparePassword) {
        statusCode = 401
        message = 'User not found or incorrect password'
        throw new Error(message)
      }

      return token
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async create(
    name: string,
    password: string,
    email: string,
    cpf: string,
    date_of_birth: Date,
    is_admin: USER_ROLE
  ): Promise<string> {
    try {
      const id: string = GenerateId.generateId()
      const hashPassword = await HashManager.hash(password)

      await UserDatabase.create(
        id,
        name,
        hashPassword,
        email,
        cpf,
        date_of_birth,
        is_admin
      )

      await AccountsDatabase.create(id, name)
      const token = GenerateAuthToken.generateToken({ id, is_admin })

      return token as string
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async update(
    name: string,
    password: string,
    token: string
  ): Promise<string> {
    try {
      const tokenData: AuthToken = GenerateAuthToken.getTokenData(token)

      let message = 'User updated'
      let statusCode

      if (!token) {
        statusCode = 401
        message = 'Not authorized'
        throw new Error(message)
      }

      await UserDatabase.update(tokenData.id, name, password)

      return message
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete(id: string, token: string): Promise<string> {
    let message = 'User removed'
    let statusCode

    try {
      const tokenData: AuthToken = GenerateAuthToken.getTokenData(token)
      if (!token || tokenData.is_admin !== 'ADMIN') {
        statusCode = 401
        message = 'Not authorized'
        throw new Error(message)
      }

      await AccountsDatabase.delete(id)
      await TransactionsDatabase.delete(id)
      await UserDatabase.delete(id)

      return message
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default new UserView()
