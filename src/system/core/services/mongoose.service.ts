import path from 'path';

import mongoose from 'mongoose';
import winston from 'winston';

import { DB_HOST, DB_PORT, DB_DATABASE, NODE_ENV } from '../config';

// export class MongooseConnect {

//   static instance: MongooseConnect;
//   public readonly mode = 'dark';
//   private count = 0;
//   private mongooseOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000
//     //useFindAndModify: false,
//   };

//   // prevent new with private constructor
//   private constructor() {
//     this.connectWithRetry();
//   }

//   static getInstance(): MongooseConnect {
//     if (NODE_ENV !== 'production') {
//       mongoose.set('debug', true);
//     }
//     mongoose.set('strictQuery', true);
//     if (!MongooseConnect.instance) {
//       MongooseConnect.instance = mongoose;
//     }

//     return MongooseConnect.instance;
//   }

//   connectWithRetry = () => {
//     if (NODE_ENV !== 'production') {
//       mongoose.set('debug', true);
//     }
//     mongoose.set('strictQuery', true);
//     mongoose
//       .connect(
//         `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
//         this.mongooseOptions
//       )
//       .then(() => {
//         console.log('MongoDB is connected');
//       })
//       .catch((err) => {
//         const retrySeconds = 5;
//         console.log(
//           `MongoDB connection unsuccessful (will retry #${++this
//             .count} after ${retrySeconds} seconds):`,
//           err
//         );
//         setTimeout(this.connectWithRetry, retrySeconds * 1000);
//       });
//   };

// }

// export class MongooseService {
//   private count = 0;
//   private mongooseOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000
//     //useFindAndModify: false,
//   };

//   constructor() {
//     this.connectWithRetry();
//   }

//   getMongoose() {
//     return mongoose;
//   }

//   connectWithRetry = () => {
//     if (NODE_ENV !== 'production') {
//       mongoose.set('debug', true);
//     }
//     mongoose.set('strictQuery', true);
//     mongoose
//       .connect(
//         `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
//         this.mongooseOptions
//       )
//       .then(() => {
//         console.log('MongoDB is connected');
//       })
//       .catch((err) => {
//         const retrySeconds = 5;
//         console.log(
//           `MongoDB connection unsuccessful (will retry #${++this
//             .count} after ${retrySeconds} seconds):`,
//           err
//         );
//         setTimeout(this.connectWithRetry, retrySeconds * 1000);
//       });
//   };
// }


// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

export class MongooseService {
    private readonly _logger: winston.Logger;

    private static _instance: MongooseService;

    private constructor() {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
              }),
              logFormat
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                  level: 'info',
                  datePattern: 'YYYY-MM-DD',
                  dirname: path.join(__dirname, `../../../logs/database`), // log file /logs/error/*.log in save
                  filename: `logs.log`,
                  maxFiles: 30, // 30 Days saved
                  //json: false,
                  //zippedArchive: true
                }),
            ],
        });

        if (NODE_ENV !== 'production') {
          mongoose.set('debug', true);
        }
        mongoose.set('strictQuery', true);

        mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          //useCreateIndex: true,
          //useFindAndModify: false,
        }).then(() => this._logger.info('MongoDB connection established successfully'))
        .catch((e: mongoose.Error) => this._logger.error(`MongoDB connection failed with error: ${e}`));
    }

    static getInstance(): MongooseService {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new MongooseService();
        return this._instance;
    }

    public get logger() {
        return this._logger;
    }
}
