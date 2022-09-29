import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatch } from '../interfaces/IMatch';

export default class MatchModel {
  private _model = Match;

  async findAll(): Promise<IMatch[]> {
    const result = await this._model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return result;
  }

  async findByProgress(progress: boolean): Promise<IMatch[]> {
    const result = await this._model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { inProgress: progress },
    });
    return result;
  }
}
