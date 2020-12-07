import { Product } from '../entity/product.entity'
import { name, internet } from 'faker';

export default class TestUtil {
  static giveAMeAValidProduct(): Product {
    const product = new Product();
    product.name = name.title();
    product.description = 'Produto lancamento 2020';
    product.price = '1000.00';
    // product.images_id = 'dwadwdawdad';
    product.userId = '7c21f8aa-d0bd-46c8-b284-a1db2326f478';
    product.id = '9a74f86c-ec77-4a93-bdfe-3894a47c9967';
    return product;
  }

  // static giveAMeAValidProductUpdate(): Product {
  //   const user = new Product();
  //   user.name = name.firstName();
  //   user.password = internet.password()

  //   return user;
  // }
}