import { Request, Response } from 'express';
import CustomService from '../services/CustomService';

import {
  INTERNAL_SERVER_ERROR,
  OK,
} from '../utils';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
  noContent = 'No content',
  idLength = 'Id must have 24 hexadecimal characters',
}

abstract class CustomController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(public service: CustomService<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.status(OK).json(objs);
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}

export default CustomController;
