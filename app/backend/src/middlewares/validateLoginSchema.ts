import { RequestHandler } from 'express';
import * as Joi from 'joi';
import { IUserLogin } from '../interfaces/IUser';
import CustomError from '../interfaces/CustomError';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLoginSchema: RequestHandler = (req, _res, next) => {
  const user: IUserLogin = req.body;

  const { error } = loginSchema.validate(user);
  if (error) {
    throw new CustomError(400, 'All fields must be filled');
  }
  next();
};

export default validateLoginSchema;
