import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: '../ecomerce.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', '..', 'src', '**', 'entity', '*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, '..', 'migrations', '*')],
  // synchronize: true,
};

module.exports = options;