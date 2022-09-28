import { IUserLogin } from '../interfaces/IUser';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private model: UserModel = new UserModel()) {}

  async login(user: IUserLogin) {
    const validUser = await this.model.findOne(user.email);
    console.log(validUser);
    if (!validUser) {
      throw Error('Incorrect email or password');
    }
    const token = 'dsad2dedsad';
    return token;
  }
}
