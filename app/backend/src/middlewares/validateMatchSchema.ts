import { RequestHandler } from 'express';
import * as Joi from 'joi';
import CustomError from '../interfaces/CustomError';
import { IMatchInput } from '../interfaces/IMatch';

const matchSchema = Joi.object({
  homeTeam: Joi.required(),
  awayTeam: Joi.required(),
  homeTeamGoals: Joi.required(),
  awayTeamGoals: Joi.required(),
});

const validateMatchSchema: RequestHandler = (req, _res, next) => {
  const match: IMatchInput = req.body;

  const { error } = matchSchema.validate(match);
  if (error) {
    throw new CustomError(400, 'All fields must be filled');
  }
  next();
};

export default validateMatchSchema;
