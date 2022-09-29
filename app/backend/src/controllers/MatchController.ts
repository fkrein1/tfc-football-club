import { RequestHandler } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private service: MatchService = new MatchService()) {}

  findAll: RequestHandler = async (req, res, next) => {
    try {
      const { inProgress } = req.query;
      if (inProgress === 'true' || inProgress === 'false') {
        const result = await this.service.findByProgress(inProgress === 'true');
        return res.status(200).json(result);
      }
      const result = await this.service.findAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
