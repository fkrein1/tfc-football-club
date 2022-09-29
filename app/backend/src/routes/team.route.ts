import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();
const route = Router();

route.get('/teams', (req, res, next) => teamController.findAll(req, res, next));
route.get('/teams/:id', (req, res, next) => teamController.findOne(req, res, next));

export default route;
