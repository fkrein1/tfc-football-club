import Users from '../database/models/User';

export default class UserModel {
  private _model = Users;

  create() {
    return this._model.create();
  }
}
