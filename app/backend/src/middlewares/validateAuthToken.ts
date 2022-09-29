import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import CustomError from './CustomError';

const validateAuthToken: RequestHandler = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(401, 'Token must be a valid token');
  verify(authorization, process.env.JWT_SECRET as string);
  next();
};

export default validateAuthToken;
