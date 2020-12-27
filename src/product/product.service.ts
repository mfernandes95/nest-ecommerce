import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import { File } from './entity/file.entity'
import * as fs from 'fs'

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
  }

  async uploadFiles(files, productId, userId): Promise<any> {
    if (!files) throw new HttpException({
      status: 404,
      error: 'Add files to upload',
      path: '/files',
      timestamp: new Date().toISOString(),
    }, 404);

    for (const file in files) {
      const fileUpload = this.fileRepo.create({
        file: files[file].filename,
        name: files[file].originalname,
        type: files[file].mimetype,
        productId,
        userId,
      })

      await this.fileRepo.save(fileUpload)
        .catch(err => {
          if (err.code == '23503') {
            throw new HttpException({
              status: 404,
              error: 'Foreignkey error!',
              path: '/files',
              timestamp: new Date().toISOString(),
            }, 404);
          }

          throw new HttpException({
            status: 400,
            error: 'upload filed!',
            path: '/files',
            timestamp: new Date().toISOString(),
          }, 400);
        })
    }
  }

  async findFileById(id: String): Promise<File> {
    return await this.fileRepo.findOneOrFail({ id })
  }

  async removeFile(id: String, userId: String) {

    const file = await this.fileRepo.findOneOrFail({ id })

    if (file.userId != userId) throw new HttpException({
      status: 403,
      error: 'Not permited!',
      path: '/products',
      timestamp: new Date().toISOString(),
    }, 403);

    fs.unlinkSync(`./files/${file.file}`)
    return await this.fileRepo.delete({ id })
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

  findOne(id: String): Promise<Product> {
    return this.productRepo.findOneOrFail({ id })
  }

  async update(id: String, updateProductDto: UpdateProductDto, userId: String) {
    const product = await this.productRepo.findOneOrFail({ id })

    if (product.userId != userId) throw new HttpException({
      status: 403,
      error: 'Not permited!',
      path: '/products',
      timestamp: new Date().toISOString(),
    }, 403);

    await this.productRepo.update({ id }, updateProductDto)
    return this.productRepo.findOneOrFail({ id })
  }

  async remove(id: String, userId: String): Promise<DeleteResult> {
    const product = await this.productRepo.findOneOrFail({ id })
    if (product.userId != userId) throw new HttpException({
      status: 403,
      error: 'Not permited!',
      path: '/products',
      timestamp: new Date().toISOString(),
    }, 403);
    return await this.productRepo.delete({ id })
  }
}
