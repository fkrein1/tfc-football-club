import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();
const route = Router();

route.get('/leaderboard/away', (req, res, next) => leaderboardController.getAway(req, res, next));
route.get('/leaderboard/home', (req, res, next) => leaderboardController.getHome(req, res, next));
route.get('/leaderboard', (req, res, next) => leaderboardController.getAll(req, res, next));

export default route;
