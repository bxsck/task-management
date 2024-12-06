import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  url: process.env.MONGODB_URI,
  // url: 'mongodb+srv://bxsck:ELLUbaXrjMNWiQFb@swipe-test.23j2j.mongodb.net/?ssl=true&retryWrites=true&w=majority&appName=swipe-test',
  // database: process.env.DATABASE_NAME,
  // ssl: true,
  database: 'task-management',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
