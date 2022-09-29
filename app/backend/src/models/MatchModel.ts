import Match from '../database/models/Match';
import { IMatch } from '../interfaces/IMatch';

export default class MatchModel {
  private _model = Match;

  async findAll(): Promise<IMatch[]> {
    const result = await this._model.findAll();
    return result;
  }
}
