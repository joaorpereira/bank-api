import { Request, Response } from 'express'
import {
  databaseDeletedUser,
  databaseUpdatedUser,
  databaseSignUp,
  databaseUsers,
  databaseUserByEmail,
  databaseUserByID,
} from '../data/usersData'
import {
  databaseDeleteAccount,
  databaseCreateAccount,
} from '../data/accountsData'
import { databaseDeleteTransaction } from '../data/transactionsData'
import { inputUserSignUp, inputUserLogin, User } from '../models/UserModel'
import generateId from '../middlewares/generateID'
import {
  AuthToken,
  generateToken,
  getTokenData,
} from '../middlewares/generateToken'
import { hash, compare } from '../middlewares/generateHash'

export const getUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const tokenData: AuthToken = getTokenData(token)

    let message = 'User updated'

    if (!token || tokenData.is_admin !== 'ADMIN') {
      res.statusCode = 401
      message = 'Not authorized'
      throw new Error(message)
    }

    const users: User[] = await databaseUsers()
    if (!users.length) {
      res.status(404).send('Users not found')
    }
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    let message = 'User not found'

    if (!token) {
      res.statusCode = 400
      message = 'Not authorized'
      throw new Error(message)
    }

    const { id } = req.params
    const user: User = await databaseUserByID(id)
    if (!user) {
      res.status(404).send(message)
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: inputUserLogin = req.body

    let message = 'User logged'

    if (!email || !password) {
      res.statusCode = 406
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
      res.statusCode = 404
      message = 'User not found or incorrect password'
      throw new Error(message)
    }

    if (!comparePassword) {
      res.statusCode = 401
      message = 'User not found or incorrect password'
      throw new Error(message)
    }

    res.status(200).send({ token, message })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const signUpUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      password,
      email,
      cpf,
      date_of_birth,
      is_admin,
    }: inputUserSignUp = req.body

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

    res.status(201).send({ token, message: 'User created' })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const tokenData: AuthToken = getTokenData(token)

    let message = 'User updated'

    if (!token) {
      res.statusCode = 401
      message = 'Not authorized'
      throw new Error(message)
    }

    const { name, password } = req.body
    await databaseUpdatedUser(tokenData.id, name, password)

    res.status(201).send({ message })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const tokenData: AuthToken = getTokenData(token)

    let message = 'User removed'

    if (!token || tokenData.is_admin !== 'ADMIN') {
      res.statusCode = 401
      message = 'Not authorized'
      throw new Error(message)
    }

    const { id } = req.params
    await databaseDeleteAccount(id)
    await databaseDeleteTransaction(id)
    await databaseDeletedUser(id)
    res.status(201).send({ message })
  } catch (error) {
    res.status(400).send(error.message)
  }
}
