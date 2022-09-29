import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const route = Router();

route.get('/matches', (req, res, next) => matchController.findAll(req, res, next));

export default route;
