import { Request, Response } from 'express'
import { inputUserSignUp, inputUserLogin } from '../models/UserModel'
import {
  createUserView,
  deleteUserView,
  getUsersView,
  getUserView,
  signUpView,
  updateUserView,
} from '../views/UserView'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const users = getUsersView(token)
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token: string = req.headers.authorization as string
    const { id } = req.params
    const user = getUserView(token, id)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: inputUserLogin = req.body
    const token = createUserView(email, password)
    res.status(200).send({ token })
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

    const token = signUpView(
      name,
      password,
      email,
      cpf,
      date_of_birth,
      is_admin
    )
    res.status(201).send({ token })
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
    const { name, password } = req.body
    const message = updateUserView(name, password, token)
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
    const { id } = req.params
    const message = deleteUserView(id, token)
    res.status(201).send({ message })
  } catch (error) {
    res.status(400).send(error.message)
  }
}
