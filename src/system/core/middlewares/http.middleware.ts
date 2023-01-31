import { Application } from 'express';
import compress from 'compression';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { APP_MAX_UPLOAD_LIMIT } from '../config';

class Http {
	public static initialize(_express: Application): Application {

		_express.use(bodyParser.json({
			limit: APP_MAX_UPLOAD_LIMIT
		}));

		_express.use(bodyParser.urlencoded({
			limit: APP_MAX_UPLOAD_LIMIT,
			extended: false
		}));
        _express.use(cookieParser());
		_express.disable('x-powered-by');
		_express.use(compress());
           
        //_express.use(hpp());
        //_express.use(helmet());

		return _express;
	}
}

export default Http;
