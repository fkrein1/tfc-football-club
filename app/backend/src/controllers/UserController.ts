import { RequestHandler } from 'express';
import { IUserLogin } from '../interfaces/IUser';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private service: UserService = new UserService()) {}

  login: RequestHandler = async (req, res, next) => {
    try {
      const user: IUserLogin = req.body;
      const result = await this.service.login(user);
      return res.status(200).json({ token: result });
    } catch (error) {
      next(error);
    }
  };
}
