import "./config/dotenv";
import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from './middleware/error';
import loggingMiddleware from './middleware/logging';
import routes from './routes';

export const app: Application = express();
async function createServer() {
  app.use(cors());
  app.use(loggingMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/api', routes);

  app.use(errorMiddleware);
}
createServer();
