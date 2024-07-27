import { config } from 'dotenv';
//config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const CORS_ENABLED = process.env.CORS_ENABLED === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  APP_URL,

  DB_CONNECTION_URL,

  JWT_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_IN,

  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  DEFAULT_EMAIL,
  DEFAULT_SUBJECT,

  KAFKA_BROKERS,
  KAFKA_CLIENT_ID,
  KAFKA_GROUP_ID,
  KAFKA_SUBSCRIBE_TOPIC,
  KAFKA_RETRT,
  KAFKA_RETRT_TIME,

} = process.env;
