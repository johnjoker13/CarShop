import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import express, { Router } from 'express';
import connectToDatabase from './connection';
import swaggerFile from './swagger.json';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  public startServer(PORT = process.env.PORT || 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
