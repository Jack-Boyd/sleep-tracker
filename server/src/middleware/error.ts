import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  return res.status(500).send({
    error: {
      message: 'Internal Server Error',
      details: err.message
    }
  });
}