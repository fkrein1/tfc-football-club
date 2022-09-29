import { JwtPayload } from 'jsonwebtoken';

export interface IUserJwt extends JwtPayload {
  data: {
    password: string;
    email: string;
  }
}
