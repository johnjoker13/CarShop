import { Request, Response } from 'express';
import CustomController,
{ RequestWithBody, ResponseError } from './CustomController';
import CarService from '../services/Cars.service';
import { Car } from '../interfaces/CarInterface';

import {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
} from '../utils';

class CarController extends CustomController<Car> {
  private _route: string;

  private _notfound: string = this.errors.notFound;
  
  private _internal: string = this.errors.internal;

  private _idlength: string = this.errors.idLength;

  private _requiredid: string = this.errors.requiredId;

  private _badrequest: string = this.errors.badRequest;

  private _nocontent: string = this.errors.noContent;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(INTERNAL_SERVER_ERROR)
          .json({ error: this._internal });
      }
      if ('error' in car) {
        return res.status(BAD_REQUEST).json(car);
      }
      return res.status(CREATED).json(car);
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: this._internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(BAD_REQUEST)
          .json({ error: this._idlength });
      }
      const car = await this.service.readOne(id);
      return car
        ? res.status(OK).json(car)
        : res.status(NOT_FOUND).json({ error: this._notfound });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: this._internal });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<ResponseError | Car>,
  ): Promise<Response<ResponseError | Car>> => {
    const { body, params: { id } } = req;

    if (!id) return res.status(BAD_REQUEST).json({ error: this._requiredid });

    if (Object.keys(body).length === 0) { 
      return res.status(BAD_REQUEST).json({ error: this._badrequest });
    }

    if (id.length !== 24) {
      return res.status(BAD_REQUEST)
        .json({ error: this._idlength });
    }

    const car = await this.service.update(id, body);

    if (!car) return res.status(NOT_FOUND).json({ error: this._notfound });

    return res.status(OK).json(car);
  };

  delete = async (
    req: RequestWithBody<Car>,
    res: Response<ResponseError | Car>,
  ): Promise<Response<ResponseError | Car>> => {
    const { params: { id } } = req;

    if (id.length !== 24) {
      return res.status(BAD_REQUEST)
        .json({ error: this._idlength });
    }
    
    const car = await this.service.delete(id);

    if (!car) return res.status(NOT_FOUND).json({ error: this._notfound });

    if ('error' in car) {
      return res.status(BAD_REQUEST).json({ error: this._badrequest });
    }
    
    return res.status(NO_CONTENT).json({ error: this._nocontent });
  };
}

export default CarController;
