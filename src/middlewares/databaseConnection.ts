import middy from '@middy/core';
import { AppDataSource } from '../config/database/data-source';

const openConnection = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error('Error initializing database connection', error);
    throw error;
  }
};

const closeConection = async () => {
  try {
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error close database connection', error);
    throw error;
  }
};

export const databaseConnection = () => {
  const before: middy.MiddlewareFn = async () => {
    await openConnection();
  };

  const after: middy.MiddlewareFn = async () => {
    await closeConection();
  };

  const onError: middy.MiddlewareFn = async () => {
    await closeConection();
  };

  return { before, after, onError };
};
