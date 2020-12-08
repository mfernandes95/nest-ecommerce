import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors, UploadedFile, UploadedFiles, Res, HttpCode } from '@nestjs/common';
import { UserInfo } from '../decorators/user.decorator'
import { User } from '../user/entity/user.entity'

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    console.log('1111111111');
    return this.productService.uploadFiles(files, productId, user.id)
  }

  @Get('/files/:id')
  async seeUploadedFile(@Param('id') image, @Res() res) {
    const file = await this.productService.findFileById(image)
    return res.sendFile(file.file, { root: './files' });
  }

  @Delete('files/:id')
  @HttpCode(201)
  async removeFile(@Param('id') id: string): Promise<String> {
    await this.productService.removeFile(id);

    return 'User Removed!'
  }

  // async uploadedFile(@UploadedFile() file) {
  //   console.log('fileee', file);
  //   const response = {
  //     originalname: file.originalname,
  //     filename: file.filename,
  //   };
  //   return response;
  // }

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
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
