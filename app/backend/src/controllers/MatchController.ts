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

  updateProgress: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.service.updateProgress(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  updateScore: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const score = req.body;
      await this.service.updateScore(score, Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };
}
