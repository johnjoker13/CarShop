// src/routes/Router.ts

import { Router } from 'express';
import MongoController from '../controllers/MongoController';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: MongoController<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
    this.router
      .route(`${route}/:id`)
      .get(controller.readOne)
      .delete(controller.delete);
    this.router.post(route, controller.create);
  }
}

export default CustomRouter;
