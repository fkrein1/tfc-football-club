import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private user: UserModel = new UserModel()) {}
  public get() {
    this.user.model.create();
  }
}
