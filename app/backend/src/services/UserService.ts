import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/IUser';
import { IUserJwt } from '../interfaces/IUserJwt';
import CustomError from '../middlewares/CustomError';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private model: UserModel = new UserModel()) {}

  async login(user: IUserLogin) {
    const validUser = await this.model.findOne(user.email);
    if (!validUser) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const validPassword = compareSync(user.password, validUser.password);
    if (!validPassword) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    return token;
  }

  async validate(token: string | undefined) {
    if (!token) throw new CustomError(401, 'Token must be a valid token');
    const { data } = <IUserJwt>jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await this.model.findOne(data.email);
    return user?.role;
  }
}
