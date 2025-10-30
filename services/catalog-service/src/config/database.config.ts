import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: 'postgres-catalog',
  port: 5432,
  username: 'catalog_user',
  password: 'catalog_password',
  database: 'catalog_db',
}));