import { Response, Request } from 'express';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/Motorcycle.service';
import CustomController,
{ RequestWithBody, ResponseError } from './CustomController';

class MotorcycleController extends CustomController<Motorcycle> {
  private _route: string;

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
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in moto) {
        return res.status(400).json(moto);
      }
      return res.status(201).json(moto);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400)
          .json({ error: this.errors.idLength });
      }
      const moto = await this.service.readOne(id);
      return moto
        ? res.status(200).json(moto)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<ResponseError | Motorcycle>,
  ): Promise<Response<ResponseError | Motorcycle>> => {
    const { body, params: { id } } = req;

    if (!id) return res.status(400).json({ error: this.errors.requiredId });

    if (Object.keys(body).length === 0) { 
      return res.status(400).json({ error: this.errors.badRequest });
    }

    if (id.length !== 24) {
      return res.status(400)
        .json({ error: this.errors.idLength });
    }

    const moto = await this.service.update(id, body);

    if (!moto) return res.status(404).json({ error: this.errors.notFound });

    return res.status(200).json(moto);
  };

  delete = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<ResponseError | Motorcycle>,
  ): Promise<Response<ResponseError | Motorcycle>> => {
    const { params: { id } } = req;

    if (id.length !== 24) {
      return res.status(400)
        .json({ error: this.errors.idLength });
    }
    
    const moto = await this.service.delete(id);

    if (!moto) return res.status(404).json({ error: this.errors.notFound });

    if ('error' in moto) {
      return res.status(400).json(moto);
    }
    
    return res.status(204).json(moto);
  };
}

export default MotorcycleController;
