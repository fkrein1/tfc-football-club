import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatch, IMatchInput, IMatchScore } from '../interfaces/IMatch';

export default class MatchModel {
  constructor(private _model: typeof Match = Match) {}

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

  async create(match: IMatchInput): Promise<IMatch> {
    const result = await this._model.create({
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    return result;
  }

  async updateProgress(id: number):Promise<number> {
    const [result] = await this._model.update(
      { inProgress: false },
      { where: { id } },
    );
    return result;
  }

  async updateScore(score: IMatchScore, id: number):Promise<number> {
    const [result] = await this._model.update(
      { homeTeamGoals: score.homeTeamGoals, awayTeamGoals: score.awayTeamGoals },
      { where: { id } },
    );
    return result;
  }
}
