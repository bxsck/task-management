import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { dataSourceOptions } from './config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
// import { Module } from '@nestjs/common';
// import { TodosModule } from './todos/todos.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthenticationsModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { dataSourceOptions } from './config/database.config';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot(dataSourceOptions),
//     TodosModule,
//     AuthenticationsModule,
//     UsersModule,
//   ],
// })
// export class AppModule {}