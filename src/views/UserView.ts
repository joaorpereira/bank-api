import { compare, hash } from '../middlewares/generateHash'
import {
  databaseDeletedUser,
  databaseSignUp,
  databaseUpdatedUser,
  databaseUserByEmail,
  databaseUserByID,
  databaseUsers,
} from '../data/usersData'
import generateId from '../middlewares/generateID'
import {
  AuthToken,
  generateToken,
  getTokenData,
} from '../middlewares/generateToken'
import { User, USER_ROLE } from '../models/UserModel'
import {
  databaseCreateAccount,
  databaseDeleteAccount,
} from '../data/accountsData'
import { databaseDeleteTransaction } from '../data/transactionsData'

export const getUsersView = async (token: string): Promise<User[]> => {
  const tokenData: AuthToken = getTokenData(token)

  let message = 'Users not found'
  let statusCode

  if (!token || tokenData.is_admin !== 'ADMIN') {
    statusCode = 401
    message = 'Not authorized'
    throw new Error(message)
  }

  const users: User[] = await databaseUsers()

  if (!users.length) {
    statusCode = 404
    throw new Error(message)
  }

  return users
}

export const getUserView = async (token: string, id: string): Promise<User> => {
  let message = 'User not found'
  let statusCode

  if (!token) {
    statusCode = 400
    message = 'Not authorized'
    throw new Error(message)
  }

  const user: User = await databaseUserByID(id)
  if (!user) {
    statusCode = 404
    throw new Error(message)
  }

  return user
}

export const createUserView = async (
  email: string,
  password: string
): Promise<string> => {
  let message = 'User logged'
  let statusCode

  if (!email || !password) {
    statusCode = 406
    message = 'Email and password are required'
    throw new Error(message)
  }

  const user: User = await databaseUserByEmail(email)
  const token: string = generateToken({
    id: user.id,
    is_admin: user.is_admin,
  })

  const comparePassword: boolean = await compare(password, user.password)

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
}

export const signUpView = async (
  name: string,
  password: string,
  email: string,
  cpf: string,
  date_of_birth: Date,
  is_admin: USER_ROLE
): Promise<string> => {
  const id: string = generateId()
  const hashPassword = await hash(password)

  await databaseSignUp(
    id,
    name,
    hashPassword,
    email,
    cpf,
    date_of_birth,
    is_admin
  )
  await databaseCreateAccount(id, name)
  const token: string = generateToken({ id, is_admin })

  return token
}

export const updateUserView = async (
  name: string,
  password: string,
  token: string
): Promise<string> => {
  const tokenData: AuthToken = getTokenData(token)

  let message = 'User updated'
  let statusCode

  if (!token) {
    statusCode = 401
    message = 'Not authorized'
    throw new Error(message)
  }

  await databaseUpdatedUser(tokenData.id, name, password)

  return message
}

export const deleteUserView = async (
  id: string,
  token: string
): Promise<string> => {
  const tokenData: AuthToken = getTokenData(token)

  let message = 'User removed'
  let statusCode

  if (!token || tokenData.is_admin !== 'ADMIN') {
    statusCode = 401
    message = 'Not authorized'
    throw new Error(message)
  }

  await databaseDeleteAccount(id)
  await databaseDeleteTransaction(id)
  await databaseDeletedUser(id)

  return message
}
