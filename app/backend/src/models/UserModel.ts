import User from '../database/models/User';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  private _model = User;

  async findOne(email: string): Promise<IUser | null> {
    const result = await this._model.findOne({ where: { email } });
    return result;
  }
}
