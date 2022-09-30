import * as Joi from 'joi';
import CustomError from '../interfaces/CustomError';
import { IMatchInput } from '../interfaces/IMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

// import CustomError from '../middlewares/CustomError';

export default class MatchService {
  constructor(
    private model: MatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  async findAll() {
    const matches = await this.model.findAll();
    return matches;
  }

  async findByProgress(progress: boolean) {
    const matches = await this.model.findByProgress(progress);
    return matches;
  }

  async create(match: IMatchInput) {
    MatchService.validateMatchSchema(match);
    if (match.awayTeam === match.homeTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }
    const homeTeam = await this.teamModel.findOne(match.homeTeam);
    const awayTeam = await this.teamModel.findOne(match.awayTeam);
    if (!homeTeam || !awayTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }
    const newMatch = await this.model.create(match);
    return newMatch;
  }

  static validateMatchSchema(match: IMatchInput):void {
    const matchSchema = Joi.object({
      homeTeam: Joi.number().required(),
      awayTeam: Joi.number().required(),
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
      inProgress: Joi.any(),
    });
    const { error } = matchSchema.validate(match);
    if (error) {
      throw new CustomError(400, 'All fields must be filled');
    }
  }
}
