import MatchModel from '../models/MatchModel';
// import CustomError from '../middlewares/CustomError';

export default class MatchService {
  constructor(private model: MatchModel = new MatchModel()) {}

  async findAll() {
    const matches = await this.model.findAll();
    return matches;
  }
}
