import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import * as SqliteConfig from '.././../database/config/sqlite';


describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ConfigModule.forRoot({
        //   envFilePath: '.env.test',
        // }),
        TypeOrmModule.forRoot(SqliteConfig),
        TypeOrmModule.forFeature([Product])
      ],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
