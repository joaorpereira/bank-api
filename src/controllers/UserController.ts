import { Request, Response } from "express";
import { inputUserSignUp, inputUserLogin } from "../models/UserModel";
import UserView from "../business/UserView";
class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string;
      const users = await UserView.getAll(token);
      res.status(200).send(users);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string;
      const { id } = req.params;
      const user = await UserView.get(token, id);
      res.status(200).send(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: inputUserLogin = req.body;
      const token = await UserView.login(email, password);
      res.status(200).send({ token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, password, email, cpf, date_of_birth, is_admin }: inputUserSignUp = req.body;

      const token = await UserView.create(name, password, email, cpf, date_of_birth, is_admin);

      res.status(201).send({ message: "User created successfully", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string;
      const { name, password } = req.body;
      const message = await UserView.update(name, password, token);
      res.status(201).send({ message });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string;
      const { id } = req.params;
      const message = await UserView.delete(id, token);
      res.status(201).send({ message });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}

export default new UserController();
