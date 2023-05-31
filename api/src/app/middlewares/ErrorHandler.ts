/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

import HttpException from '../errors/HttpException';
import HttpStatusCode from '../utils/HttpStatusCode';

export default function ErrorHandler(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Something went wrong';

  res.status(status).send(message);
}
