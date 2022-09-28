import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { IUserLogin } from '../interfaces/IUser';

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = (req: Request, _res: Response, next: NextFunction) => {
  const user: IUserLogin = req.body;

  const { error } = login.validate(user);
  if (error) {
    throw Error('All fields must be filled');
  }
  next();
};

export default validateLogin;
