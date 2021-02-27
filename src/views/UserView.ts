import HashManager from '../middlewares/generateHash'
import UserDatabase from '../data/usersData'
import GenerateId from '../middlewares/generateID'
import GenerateAuthToken from '../middlewares/generateToken'
import AccountsDatabase from '../data/accountsData'
import TransactionsDatabase from '../data/transactionsData'
import { User, USER_ROLE } from '../models/UserModel'
import { AuthToken } from '../models/TokenModal'
class UserView {
  async getUsers(token: string): Promise<User[]> {
    let message = 'Users not found'
    let statusCode

    try {
      const tokenData = GenerateAuthToken.getTokenData(token)

      if (!token || tokenData.is_admin !== 'ADMIN') {
        statusCode = 401
        message = 'Not authorized'
        throw new Error(message)
      }

      const users: User[] = await UserDatabase.getUsers()

      if (!users.length) {
        statusCode = 404
        throw new Error(message)
      }

      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(token: string, id: string): Promise<User> {
    let message = 'User not found'
    let statusCode
    try {
      if (!token) {
        statusCode = 400
        message = 'Not authorized'
        throw new Error(message)
      }

      const user: User = await UserDatabase.getUserByID(id)
      if (!user) {
        statusCode = 404
        throw new Error(message)
      }

      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  async createUser(email: string, password: string): Promise<string> {
    let message = 'User logged'
    let statusCode

    try {
      if (!email || !password) {
        statusCode = 406
        message = 'Email and password are required'
        throw new Error(message)
      }

      const user: User = await UserDatabase.getUserByEmail(email)
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
    } catch (error) {
      throw new Error(error)
    }
  }

  async signUp(
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

      await UserDatabase.signUp(
        id,
        name,
        hashPassword,
        email,
        cpf,
        date_of_birth,
        is_admin
      )

      await AccountsDatabase.createAccount(id, name)
      const token = GenerateAuthToken.generateToken({ id, is_admin })

      return token as string
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateUser(
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

      console.log(tokenData)

      await UserDatabase.updatedUser(tokenData.id, name, password)

      return message
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteUser(id: string, token: string): Promise<string> {
    let message = 'User removed'
    let statusCode

    try {
      const tokenData: AuthToken = GenerateAuthToken.getTokenData(token)
      if (!token || tokenData.is_admin !== 'ADMIN') {
        statusCode = 401
        message = 'Not authorized'
        throw new Error(message)
      }

      await AccountsDatabase.deleteAccount(id)
      await TransactionsDatabase.deleteTransaction(id)
      await UserDatabase.deletedUser(id)

      return message
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserView()
