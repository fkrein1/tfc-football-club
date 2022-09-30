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

  create: RequestHandler = async (req, res, next) => {
    try {
      const match = req.body;
      const newMatch = await this.service.create(match);
      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  };
}
