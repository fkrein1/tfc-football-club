import { compareSync } from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/IUser';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private model: UserModel = new UserModel()) {}

  async login(user: IUserLogin) {
    const validUser = await this.model.findOne(user.email);
    if (!validUser) {
      throw Error('Incorrect email or password');
    }
    const validPassword = compareSync(user.password, validUser.password);
    if (!validPassword) {
      throw Error('Incorrect email or password');
    }
    const token = sign({ data: user }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    return token;
  }
}
