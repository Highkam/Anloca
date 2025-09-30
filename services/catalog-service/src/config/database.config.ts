import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME || 'developer',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'catalog_db',
}));