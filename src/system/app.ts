import express from 'express';
//import helmet from 'helmet';
//import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
//import swaggerJSDoc from 'swagger-jsdoc';
//import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT } from '../config';
import { dbConnection } from './core/databases';
import { Routes } from 'system/core/interfaces/routes.interface';
import errorMiddleware from 'system/core/middlewares/error.middleware';
import { logger, stream } from './core/services/logger.service';
import validateEnv from './core/utils/validateEnv';
import CORS from './core/middlewares/cors.middleware';
import Http from './core/middlewares/http.middleware';
//import ServerMetrics from './core/providers/serverMetrics.provider';
import { MongooseService } from './core/services/mongoose.service';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private count: number = 0;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 8080;

    this.validateEnv();
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    //this.initializeSwagger();
    this.initializeErrorHandling();
    this.realtimeServerMetrics();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    new MongooseService();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app = CORS.initialize(this.app);
    this.app = Http.initialize(this.app); 
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private validateEnv() {
    validateEnv()
  }

  // private initializeSwagger() {
  //   const options = {
  //     swaggerDefinition: {
  //       info: {
  //         title: 'REST API',
  //         version: '1.0.0',
  //         description: 'Example docs',
  //       },
  //     },
  //     apis: ['swagger.yaml'],
  //   };

  //   const specs = swaggerJSDoc(options);
  //   this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  // }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private realtimeServerMetrics() {
    //this.app = ServerMetrics.initialize(this.app);
  }
}

export default App;
