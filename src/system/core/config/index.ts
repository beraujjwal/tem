import { config } from 'dotenv';
//config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
config({path: `.env`});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const CORS_ENABLED = process.env.CORS_ENABLED === 'true';
export const { 
    APP_NAME,
    NODE_ENV, 
    PORT, 
    API_PREFIX,
    APP_URL, 
    DB_HOST, 
    DB_PORT, 
    DB_DATABASE, 
    SECRET_KEY, 
    LOG_FORMAT, 
    LOG_DIR, 
    ORIGIN, 
    APP_SECRET, 
    APP_MAX_UPLOAD_LIMIT,
    APP_MAX_PARAMETER_LIMIT
} = process.env;
