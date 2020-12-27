import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { File } from './entity/file.entity';
import { ProductService } from './product.service';
import TestUtil from './util/test.util';
const fs = require('fs');

jest.mock('fs')


describe('ProductService', () => {
  let service: ProductService;

  const mockRepository = {
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(File),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOneOrFail.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Product Service', () => {
    it('should return an array of products', async () => {
      const product = TestUtil.giveAMeAValidProduct()
      mockRepository.find.mockReturnValue([product, product])
      const products = await service.findAll()
      expect(products).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1)
    });

    it('should return an product by ID', async () => {
      const product = TestUtil.giveAMeAValidProduct()
      mockRepository.findOneOrFail.mockReturnValue(product)
      const userFound = await service.findOne(product.id)
      expect(userFound).toMatchObject(product)
      expect(mockRepository.findOneOrFail).toHaveBeenCalledTimes(1)
    });

    it('should create a product', async () => {
      const product = TestUtil.giveAMeAValidProduct()
      mockRepository.create.mockReturnValue(product)
      mockRepository.save.mockReturnValue(product)
      const productProduct = await service.create(product, product.userId)
      expect(productProduct).toMatchObject(product)
      expect(mockRepository.create).toBeCalledTimes(1)
      expect(mockRepository.save).toBeCalledTimes(1)
    });

    it('should delete a product', async () => {
      const product = TestUtil.giveAMeAValidProduct()
      mockRepository.delete.mockReturnValue(product)
      mockRepository.findOneOrFail.mockReturnValue(product)

      const deletedUser = await service.remove(product.id, product.userId)

      expect(!!deletedUser).toBe(true)
      expect(mockRepository.findOneOrFail).toBeCalledTimes(1)
      expect(mockRepository.delete).toBeCalledTimes(1)
    });

    it('should update a user', async () => {
      const product = TestUtil.giveAMeAValidProduct()
      const updateProduct = TestUtil.giveAMeAValidProduct()
      // const updateUser = TestUtil.giveAMeAValidProductUpdate()

      mockRepository.findOneOrFail.mockReturnValue(product)
      mockRepository.update.mockReturnValue({
        ...product,
        ...updateProduct
      })
      mockRepository.findOneOrFail.mockReturnValue({
        ...product,
        ...updateProduct
      })
      const resultUser = await service.update(product.id, updateProduct, product.userId)
      expect(resultUser).not.toMatchObject(product)
      expect(mockRepository.findOneOrFail).toBeCalledTimes(2)
      expect(mockRepository.update).toBeCalledTimes(1)
    });

    /**
     * FILE
     */

    it('should upload files', async () => {
      const file = TestUtil.giveAMeAValidFile()
      const product = TestUtil.giveAMeAValidProduct()

      mockRepository.create.mockReturnValue(file)
      mockRepository.save.mockReturnValue(file)

      await service.uploadFiles([file, file], product.id, file.userId)

      expect(mockRepository.create).toBeCalledTimes(2)
      expect(mockRepository.save).toBeCalledTimes(2)
    });

    it('should delete a file', async () => {
      const file = TestUtil.giveAMeAValidFile()
      mockRepository.delete.mockReturnValue(file)
      mockRepository.findOneOrFail.mockReturnValue(file)

      fs.existsSync.mockReturnValue(true);


      const deletedFile = await service.removeFile(file.id, file.userId)

      expect(!!deletedFile).toBe(true)
      expect(mockRepository.findOneOrFail).toBeCalledTimes(1)
      expect(mockRepository.delete).toBeCalledTimes(1)
    });

    it('should return an file by ID', async () => {
      const file = TestUtil.giveAMeAValidFile()
      mockRepository.findOneOrFail.mockReturnValue(file)
      const fileFound = await service.findFileById(file.id)
      expect(fileFound).toMatchObject(file)
      expect(mockRepository.findOneOrFail).toHaveBeenCalledTimes(1)
    });

    it('should return error when upload files empty', async (done) => {
      const product = TestUtil.giveAMeAValidProduct()

      await service.uploadFiles(null, product.id, '1')
        .then(() => done.fail("Product Service should return NotFoundException error of 404 but did not"))
        .catch((error) => {
          expect(error.status).toBe(404);
          expect(error.message).toBe('Http Exception');
          expect(error.response).toMatchObject({
            status: 404,
            error: 'Add files to upload',
            path: '/files',
            timestamp: error.response.timestamp,
          });
          done();
        });
    });

    it('should return error when remove file you are not owner', async (done) => {
      const file = TestUtil.giveAMeAValidFile()
      mockRepository.findOneOrFail.mockReturnValue(file)

      await service.removeFile(file.id, '1',)
        .then(() => done.fail("Product Service should return NotFoundException error of 404 but did not"))
        .catch((error) => {
          expect(error.status).toBe(403);
          expect(error.message).toBe('Http Exception');
          expect(error.response).toMatchObject({
            status: 403,
            error: 'Not permited!',
            path: '/products',
            timestamp: error.response.timestamp,
          });
          done();
        });
    });

    it('should return error when update product you are not owner', async (done) => {
      const product = TestUtil.giveAMeAValidProduct()
      mockRepository.findOneOrFail.mockReturnValue(product)

      await service.update(product.id, product, '1')
        .then(() => done.fail("Product Service should return NotFoundException error of 404 but did not"))
        .catch((error) => {
          expect(error.status).toBe(403);
          expect(error.message).toBe('Http Exception');
          expect(error.response).toMatchObject({
            status: 403,
            error: 'Not permited!',
            path: '/products',
            timestamp: error.response.timestamp,
          });
          done();
        });
    });

    it('should return error when delete product you are not owner', async (done) => {
      const product = TestUtil.giveAMeAValidProduct()
      mockRepository.findOneOrFail.mockReturnValue(product)

      await service.remove(product.id, '1')
        .then(() => done.fail("Product Service should return NotFoundException error of 404 but did not"))
        .catch((error) => {
          expect(error.status).toBe(403);
          expect(error.message).toBe('Http Exception');
          expect(error.response).toMatchObject({
            status: 403,
            error: 'Not permited!',
            path: '/products',
            timestamp: error.response.timestamp,
          });
          done();
        });
    });
  })
});
