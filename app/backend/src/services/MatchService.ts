import * as Joi from 'joi';
import CustomError from '../interfaces/CustomError';
import { IMatchInput, IMatchScore } from '../interfaces/IMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

// import CustomError from '../middlewares/CustomError';

export default class MatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  async findAll() {
    const matches = await this.matchModel.findAll();
    return matches;
  }

  async findByProgress(progress: boolean) {
    const matches = await this.matchModel.findByProgress(progress);
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
    const newMatch = await this.matchModel.create(match);
    return newMatch;
  }

  async updateProgress(id: number): Promise<void> {
    const result = await this.matchModel.updateProgress(id);
    if (result !== 1) {
      throw new CustomError(404, 'Update unsuccessful');
    }
  }

  async updateScore(score: IMatchScore, id: number): Promise<void> {
    MatchService.validateScoreSchema(score);
    const result = await this.matchModel.updateScore(score, id);
    if (result !== 1) {
      throw new CustomError(404, 'Update unsuccessful');
    }
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

  static validateScoreSchema(match: IMatchScore):void {
    const scoreSchema = Joi.object({
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
    });
    const { error } = scoreSchema.validate(match);
    if (error) {
      throw new CustomError(400, 'All fields must be filled');
    }
  }
}
