import { Request, Response } from 'express'
import { inputUserSignUp, inputUserLogin } from '../models/UserModel'
import UserView from '../views/UserView'
class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string
      const users = await UserView.getUsers(token)
      res.status(200).send(users)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string
      const { id } = req.params
      const user = await UserView.getUser(token, id)
      res.status(200).send(user)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: inputUserLogin = req.body
      const token = await UserView.createUser(email, password)
      res.status(200).send({ token })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async signUpUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        password,
        email,
        cpf,
        date_of_birth,
        is_admin,
      }: inputUserSignUp = req.body

      const token = await UserView.signUp(
        name,
        password,
        email,
        cpf,
        date_of_birth,
        is_admin
      )

      res.status(201).send({ message: 'User created successfully', token })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string
      const { name, password } = req.body
      console.log(token)
      const message = await UserView.updateUser(name, password, token)
      res.status(201).send({ message })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string
      const { id } = req.params
      const message = await UserView.deleteUser(id, token)
      res.status(201).send({ message })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

export default new UserController()
