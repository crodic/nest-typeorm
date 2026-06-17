import dotenv from 'dotenv';

export const TEST_ENV_FILE_MARKER = 'testing';

export function getEnvFilePath(): string[] {
  return process.env.NODE_ENV === 'test' ? ['.env.testing'] : ['.env'];
}

export function loadEnvFile(): void {
  dotenv.config({
    path: getEnvFilePath()[0],
    override: process.env.NODE_ENV === 'test',
  });
}

export function assertTestingEnvironment(): void {
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  if (process.env.TEST_ENV_FILE !== TEST_ENV_FILE_MARKER) {
    throw new Error(
      'NODE_ENV=test requires .env.testing to be loaded with TEST_ENV_FILE=testing.',
    );
  }

  const databaseTarget = process.env.DATABASE_URL || process.env.DATABASE_NAME;
  if (!databaseTarget || !/test/i.test(databaseTarget)) {
    throw new Error(
      'NODE_ENV=test requires DATABASE_NAME or DATABASE_URL to point to a test database.',
    );
  }
}
