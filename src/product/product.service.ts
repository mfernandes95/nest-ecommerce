import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import { User } from '../user/entity/user.entity'
import { File } from './entity/file.entity'

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
  }

  async uploadFiles(files, productId, userId): Promise<File> {
    // const response = [];
    return files.forEach(async file => {
      // const fileReponse = {
      //   originalname: file.originalname,
      //   filename: file.filename,
      // };
      // response.push(fileReponse);

      let xis = this.fileRepo.create({
        file: file.filename,
        name: file.originalname,
        type: file.mimetype,
        subtype: file.mimetype,
        productId,
        userId,
      })

      await this.fileRepo.save(xis)
    });
    // console.log('respppp', response);
    // return
    // return response;
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
