import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import CustomError from '../interfaces/CustomError';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  console.error(error);
  return res.status(500).json(error);
};

export default errorHandler;
