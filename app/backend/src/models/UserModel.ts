import Users from '../database/models/User';

export default class UserModel {
  private _model = Users;

  get model() {
    return this._model;
  }
}
