import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  url: process.env.MONGODB_URI,
  database: process.env.DATABASE_NAME,
  ssl: true,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
