import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLoginSchema from '../middlewares/validateLoginSchema';

const userController = new UserController();
const route = Router();

route.post('/login', validateLoginSchema, (req, res, next) => userController.login(req, res, next));
route.get('/login/validate', (req, res, next) => userController.validate(req, res, next));

export default route;
