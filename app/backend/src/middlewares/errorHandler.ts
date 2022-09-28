import { ErrorRequestHandler } from 'express';

const errorMessages = [
  { messsage: 'All fields must be filled', code: 400 },
  { messsage: 'Incorrect email or password', code: 401 },
];

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const { message } = error;
  const validMessage = errorMessages.find((msg) => msg.messsage === message);
  if (validMessage) {
    return res.status(validMessage.code).json({ message: validMessage.messsage });
  }
  console.error(error);
  return res.status(500).json('Internal server error');
};

export default errorHandler;
