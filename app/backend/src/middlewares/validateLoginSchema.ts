import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { IUserLogin } from '../interfaces/IUser';
import CustomError from './CustomError';

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLoginSchema = (req: Request, _res: Response, next: NextFunction) => {
  const user: IUserLogin = req.body;

  const { error } = login.validate(user);
  if (error) {
    throw new CustomError(400, 'All fields must be filled');
  }
  next();
};

export default validateLoginSchema;
