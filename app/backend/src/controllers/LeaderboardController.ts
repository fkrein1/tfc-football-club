import { RequestHandler } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private service: LeaderboardService = new LeaderboardService()) {}

  getAway: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.service.getAway();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getHome: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.service.getHome();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.service.getAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
