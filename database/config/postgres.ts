
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { File } from 'src/product/entity/file.entity';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  // logging: true,
  entities: [User, Product, File],
  // entities: [path.resolve(__dirname, '..', '..', 'src', '**', 'entity', '*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, '..', 'migrations', '*')],
  // HEREEEE
  // synchronize: true,
  // logging: true,
  // dropSchema: true,
};

module.exports = options;