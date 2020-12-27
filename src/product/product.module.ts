import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { File } from './entity/file.entity';
import { UserModule } from 'src/user/user.module';
import { FormatPriceMiddleware } from 'src/middlewares/format-price.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, File]),
    UserModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FormatPriceMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PUT }
      );
  }
}
