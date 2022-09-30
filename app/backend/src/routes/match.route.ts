import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import validateAuthToken from '../middlewares/validateAuthToken';

const matchController = new MatchController();
const route = Router();

route.get('/matches', (req, res, next) => matchController.findAll(req, res, next));
route.post(
  '/matches',
  validateAuthToken,
  (req, res, next) => matchController.create(req, res, next),
);
route.patch(
  '/matches/:id/finish',
  validateAuthToken,
  (req, res, next) => matchController.updateProgress(req, res, next),
);

route.patch(
  '/matches/:id',
  validateAuthToken,
  (req, res, next) => matchController.updateScore(req, res, next),
);

export default route;
