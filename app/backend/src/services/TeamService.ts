import TeamModel from '../models/TeamModel';
import CustomError from '../interfaces/CustomError';

export default class TeamService {
  constructor(private model: TeamModel = new TeamModel()) {}

  async findAll() {
    const teams = await this.model.findAll();
    return teams;
  }

  async findOne(id: string) {
    const team = await this.model.findOne(Number(id));
    if (!team) throw new CustomError(401, 'Invalid team id');
    return team;
  }
}
