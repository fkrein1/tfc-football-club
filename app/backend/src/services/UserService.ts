import { compareSync } from 'bcryptjs';
import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import CustomError from '../interfaces/CustomError';
import { IUserLogin } from '../interfaces/IUser';
import { IUserJwt } from '../interfaces/IUserJwt';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private model: UserModel = new UserModel()) {}

  async login(user: IUserLogin) {
    UserService.validateLoginSchema(user);
    const validUser = await this.model.findOne(user.email);
    if (!validUser) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const validPassword = compareSync(user.password, validUser.password);
    if (!validPassword) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET as string);
    return token;
  }

  async validate(token: string | undefined) {
    if (!token) throw new CustomError(401, 'Token must be a valid token');
    const { data } = <IUserJwt>jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await this.model.findOne(data.email);
    return user?.role;
  }

  private static validateLoginSchema(user: IUserLogin): void {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = loginSchema.validate(user);
    if (error) {
      throw new CustomError(400, 'All fields must be filled');
    }
  }
}
