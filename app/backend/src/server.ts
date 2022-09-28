import 'dotenv/config';
import 'express-async-errors';
import { App } from './app';

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
