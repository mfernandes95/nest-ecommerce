import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import { User } from '../user/entity/user.entity'

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {
  }

  async create(createProductDto: CreateProductDto, userId): Promise<Product> {
    const product = this.productRepo.create({
      ...createProductDto,
      userId
    })

    return await this.productRepo.save(product)
  }

  findAll(): Promise<Product[]> {
    return this.productRepo.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
