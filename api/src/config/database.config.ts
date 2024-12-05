import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://bxsck:ELLUbaXrjMNWiQFb@swipe-test.23j2j.mongodb.net/?retryWrites=true&w=majority&appName=swipe-test',
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
