import databaseConfig from './database.config';

describe('DatabaseConfig', () => {
  it('should return default configuration', () => {
    const config = databaseConfig();

    expect(config).toEqual({
      host: 'localhost',
      port: 5432,
      username: 'developer',
      password: 'password123',
      database: 'catalog_db',
    });
  });

  it('should use environment variables when available', () => {
    process.env.DB_HOST = 'test-host';
    process.env.DB_PORT = '5433';
    process.env.DB_USERNAME = 'test-user';
    process.env.DB_PASSWORD = 'test-pass';
    process.env.DB_NAME = 'test-db';

    const config = databaseConfig();

    expect(config).toEqual({
      host: 'test-host',
      port: 5433,
      username: 'test-user',
      password: 'test-pass',
      database: 'test-db',
    });

    // Clean up
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_USERNAME;
    delete process.env.DB_PASSWORD;
    delete process.env.DB_NAME;
  });
});