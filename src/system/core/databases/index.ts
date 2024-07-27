import mongoose from 'mongoose';
import { DBConnection } from '../../../config/db.config';
import { NODE_ENV } from '../../../config';


export const connectDatabase = async () => {

  mongoose
  .connect(DBConnection.url, { retryWrites: true, w: 'majority' })
    .then(() => {
      console.info(`Running on ENV = ${NODE_ENV}`);
      console.info('Connected to mongoDB.');
    })
    .catch((error) => {
      console.error('Unable to connect.');
      console.error(error);
    });

    if (NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.set('strictQuery', true);
}
