// jest.mock('../utils/mocks/user.service.ts')
// jest.mock('util/test.util')

import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './entity/user.entity';
import { UserService } from './user.service';
import TestUtil from './util/test.util';

describe('UserService', () => {
  let service: UserService;

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
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
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

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('User Service', () => {
    it('should return an array of users', async () => {
      const user = TestUtil.giveAMeAValidUser()
      mockRepository.find.mockReturnValue([user, user])
      const users = await service.find()
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1)
    });

    it('should return an users by ID', async () => {
      const user = TestUtil.giveAMeAValidUser()
      mockRepository.findOneOrFail.mockReturnValue(user)
      const userFound = await service.findById(user.id)
      expect(userFound).toMatchObject(user)
      expect(mockRepository.findOneOrFail).toHaveBeenCalledTimes(1)
    });

    it('should return a exception when not find user by ID', async () => {
      mockRepository.findOneOrFail.mockReturnValue(null)
      expect(await service.findById('13')).toBe(null)
      expect(mockRepository.findOneOrFail).toHaveBeenCalledTimes(1)
    });

    it('should return an users by email', async () => {
      const user = TestUtil.giveAMeAValidUser()
      mockRepository.findOne.mockReturnValue(user)
      const userFound = await service.findByEmail(user.email)
      expect(userFound).toMatchObject(user)
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    });

    it('should return a exception when not find user by email', async () => {
      mockRepository.findOne.mockReturnValue(null)
      console.log('batataaa', await service.findByEmail('user@email.com'));
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
      expect(await service.findByEmail('user@email.com')).toBe(null)
    });

    it('should create a user', async () => {
      const user = TestUtil.giveAMeAValidUser()
      mockRepository.create.mockReturnValue(user)
      mockRepository.save.mockReturnValue(user)
      const savedUser = await service.createUser(user)
      expect(savedUser).toMatchObject(user)
      expect(mockRepository.create).toBeCalledTimes(1)
      expect(mockRepository.save).toBeCalledTimes(1)
    });
  })
});
