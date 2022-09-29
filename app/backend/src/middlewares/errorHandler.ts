import { ErrorRequestHandler } from 'express';
import CustomError from './CustomError';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json('Internal server error');
};

export default errorHandler;
