import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const userController = new UserController();
const route = Router();

route.post('/login', validateLogin, (req, res, next) => userController.login(req, res, next));

export default route;
