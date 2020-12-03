import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import TestUtil from './util/test.util';


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
        }],
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
      console.log('prodddd', products);
      expect(products).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1)
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
  })
});
