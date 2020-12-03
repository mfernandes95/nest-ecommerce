import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as PostgresConfig from '../database/config/postgres';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception-filters/http-exception-filter';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.exception-filter';
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product.entity';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User, Product],
      // HEREEEE
      // synchronize: true,
      // logging: true,
      // dropSchema: true,
    }),
    TypeOrmModule.forFeature([User, Product]),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController, UserController, ProductController],
  providers: [AppService, UserService, ProductService,
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule { }
