import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entity/user.entity';
import { FormatPriceMiddleware } from 'src/middlewares/format-price.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
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
      .forRoutes({ path: 'product', method: RequestMethod.POST });
  }
}
