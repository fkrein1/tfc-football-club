import { Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const route = Router();

route.post('/login', (req, res, next) => userController.login(req, res, next));
route.get('/login/validate', (req, res, next) => userController.validate(req, res, next));

export default route;
