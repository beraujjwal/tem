import cors from 'cors';
import { Application } from 'express';
import { CORS_ENABLED, ORIGIN, CREDENTIALS, APP_URL } from '../config';

class CORS {
  public initialize(_express: Application): Application {
    const origin = CORS_ENABLED ? ORIGIN : APP_URL;

    const options: cors.CorsOptions = {
      origin: origin,
      credentials: CREDENTIALS,
      optionsSuccessStatus: 200
    };

    _express.use(cors(options));

    return _express;
  }
}

export default new CORS();
