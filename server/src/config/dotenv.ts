import dotenv from 'dotenv';
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5002,
  DATABASE_URL: process.env.DATABASE_URL || '',
};

export default env;