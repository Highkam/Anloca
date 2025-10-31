import databaseConfig from './database.config';

describe('DatabaseConfig', () => {
  it('should return default configuration', () => {
    const config = databaseConfig();

    expect(config).toEqual({
      host: 'postgres-catalog',
      port: 5432,
      username: 'catalog_user',
      password: 'catalog_password',
      database: 'catalog_db',
    });
  });
});