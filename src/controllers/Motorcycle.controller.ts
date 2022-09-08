import { Response, Request } from 'express';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/Motorcycle.service';
import CustomController,
{ RequestWithBody, ResponseError } from './CustomController';

import {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
} from '../utils';

class MotorcycleController extends CustomController<Motorcycle> {
  private _route: string;

  private _notfound: string = this.errors.notFound;
  
  private _internal: string = this.errors.internal;

  private _idlength: string = this.errors.idLength;

  private _requiredid: string = this.errors.requiredId;

  private _badrequest: string = this.errors.badRequest;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const moto = await this.service.create(body);
      if (!moto) {
        return res.status(INTERNAL_SERVER_ERROR)
          .json({ error: this._internal });
      }
      if ('error' in moto) {
        return res.status(BAD_REQUEST).json(moto);
      }
      return res.status(CREATED).json(moto);
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ error: this._internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(BAD_REQUEST)
          .json({ error: this._idlength });
      }
      const moto = await this.service.readOne(id);
      return moto
        ? res.status(OK).json(moto)
        : res.status(NOT_FOUND).json({ error: this._notfound });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ error: this._internal });
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<ResponseError | Motorcycle>,
  ): Promise<Response<ResponseError | Motorcycle>> => {
    const { body, params: { id } } = req;

    if (!id) {
      return res.status(BAD_REQUEST)
        .json({ error: this._requiredid });
    }

    if (Object.keys(body).length === 0) { 
      return res.status(BAD_REQUEST).json({ error: this._badrequest });
    }

    if (id.length !== 24) {
      return res.status(BAD_REQUEST)
        .json({ error: this._idlength });
    }

    const moto = await this.service.update(id, body);

    if (!moto) return res.status(NOT_FOUND).json({ error: this._notfound });

    return res.status(OK).json(moto);
  };

  delete = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<ResponseError | Motorcycle>,
  ): Promise<Response<ResponseError | Motorcycle>> => {
    const { params: { id } } = req;

    if (id.length !== 24) {
      return res.status(BAD_REQUEST)
        .json({ error: this._idlength });
    }
    
    const moto = await this.service.delete(id);

    if (!moto) return res.status(NOT_FOUND).json({ error: this._notfound });

    if ('error' in moto) {
      return res.status(BAD_REQUEST).json(moto);
    }
    
    return res.status(NO_CONTENT).json(moto);
  };
}

export default MotorcycleController;
