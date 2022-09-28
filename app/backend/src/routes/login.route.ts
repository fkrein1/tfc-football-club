import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const userController = new UserController();
const route = Router();

route.post('/login', validateLogin, (req, res) => userController.login(req, res));

export default route;
