// src/routes/Router.ts

import { Router } from 'express';
import CustomController from '../controllers/CustomController';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: CustomController<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
    this.router
      .route(`${route}/:id`)
      .get(controller.readOne)
      .put(controller.update)
      .delete(controller.delete);
    this.router.post(route, controller.create);
  }
}

export default CustomRouter;
