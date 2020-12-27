import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, Res, HttpCode } from '@nestjs/common';
import { UserInfo } from '../decorators/user.decorator'
import { User } from '../user/entity/user.entity'

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './util/file-upload.util';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':product_id/files')
  @HttpCode(204)
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files,
    @UserInfo() user: User,
    @Param('product_id') productId
  ) {
    return await this.productService.uploadFiles(files, productId, user.id)
  }

  @Get('/files/:imgpath/static')
  seeFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Get('/files/:id')
  async seeUploadedFile(@Param('id') image, @Res() res) {
    const file = await this.productService.findFileById(image)
    return res.sendFile(file.file, { root: './files' });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('files/:id')
  @HttpCode(201)
  async removeFile(@Param('id') id: string,
    @UserInfo() user: User,
  ): Promise<String> {
    await this.productService.removeFile(id, user.id);

    return 'User Removed!'
  }

  /**
   * PRODUCTS
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto,
    @UserInfo() user: User
  ) {
    return this.productService.create(createProductDto, user.id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UserInfo() user: User
  ) {
    return this.productService.update(id, updateProductDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: String,
    @UserInfo() user: User
  ): Promise<String> {
    await this.productService.remove(id, user.id);

    return 'product Removed!'
  }
}
