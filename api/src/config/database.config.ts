import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://bxsck:ELLUbaXrjMNWiQFb@swipe-test.23j2j.mongodb.net/?ssl=true&retryWrites=true&w=majority&appName=swipe-test',
  // database: process.env.DATABASE_NAME,
  ssl: true,
  database: 'task-management',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
