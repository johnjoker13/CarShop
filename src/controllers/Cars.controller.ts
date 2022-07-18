// src/controllers/car.ts

import { Request, Response } from 'express';
import MongoController,
{ RequestWithBody, ResponseError } from './MongoController';
import CarService from '../services/Cars.service';
import { Car } from '../interfaces/CarInterface';

const lenErr = 'Id must have 24 hexadecimal characters';

class CarController extends MongoController<Car> {
  private _route: string;

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
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400)
          .json({ error: lenErr });
      }
      const car = await this.service.readOne(id);
      return car
        ? res.status(200).json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string, obj: Car }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body: { obj }, params: { id } } = req;
    try {
      if (id.length < 24) {
        return res.status(400)
          .json({ error: lenErr });
      }
      const findId = await this.service.readOne(id);
      const car = await this.service.update(id, obj);
      if (!findId) return res.status(404).json({ error: this.errors.notFound });
      if (!req.body) return res.status(400).json({ error: 'Object is empty' });
      return res.status(200).json(car as Car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      await this.service.delete(id);
      if (id.length < 24) {
        return res.status(400)
          .json({ error: lenErr });
      }
      const findId = await this.service.readOne(id);
      if (!findId) return res.status(404).json({ error: this.errors.notFound });
      return res.status(204);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
