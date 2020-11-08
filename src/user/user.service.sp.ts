import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './entity/user.entity';
import { UserService } from './user.service';
import TestUtil from 'src/user/common/test/test.util';
// import {TestUtil} from '../common/test/test.util';
// import {
//   mockAddAccountParams,
//   mockUpdateUserParams,
//   mockUpdatedUserModel,
//   mockUserModel,
//   mockUserArrayModel,
// } from './../common/test/TestUtil';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
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

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('When search all Users', () => {
  //   it('Should list all users', async () => {
  //     // const user = TestUtil.giveMeAValidUser()
  //     // mockRepository.find.mockReturnValue([user, user])

  //     // console.log('iduhauid111111', user);

  //     // const users = await service.find()
  //     // expect(users).toHaveLength(2)

  //     const result = await service.createUser({
  //       name: 'Matheus',
  //       email: 'msamsa@email.com',
  //       password: "wdawd"
  //     })

  //     console.log('wdw22222222', result);

  //     // const result = ['test'];
  //     jest.spyOn(service, 'find').mockImplementation(() => [result]);

  //     expect(await service.find()).toBe([result]);

  //     // expect(users).resolves.toBe(mockUserArrayModel);
  //     // expect(service.find()).toHaveBeenCalledTimes(2);
  //   });
  // });

  // describe('When search all Users', () => {
  //   it('Should list all users', async () => {
  //     const users = service.findAllUsers();

  //     expect(users).resolves.toBe(mockUserArrayModel);
  //     expect(mockRepository.find).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('When search User By Id', () => {
  //   it('Should find a existing user', async () => {
  //     const userFound = service.getUserById('1');

  //     expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel.id);
  //     expect(userFound).resolves.toBe(mockUserModel);
  //   });
  //   it('Should return a exception when does not to find a user', async () => {
  //     mockRepository.findOne.mockReturnValue(null);

  //     const user = service.getUserById('3');

  //     expect(user).rejects.toThrow(NotFoundException);
  //     expect(mockRepository.findOne).toHaveBeenCalledWith('3');
  //   });
  // });

  // describe('When create a user', () => {
  //   it('Should create a user', async () => {
  //     const user = service.createUser(mockAddAccountParams);

  //     expect(mockRepository.create).toBeCalledWith(mockAddAccountParams);
  //     expect(mockRepository.save).toBeCalledTimes(1);
  //     expect(user).resolves.toBe(mockUserModel);
  //   });
  // });

  // describe('When update User', () => {
  //   it('Should update a user', async () => {
  //     service.getUserById = jest.fn().mockReturnValueOnce(mockUserModel);

  //     const userUpdated = service.updateUser(mockUpdateUserParams);

  //     expect(service.getUserById).toHaveBeenCalledWith(mockUpdateUserParams.id);
  //     expect(userUpdated).resolves.toBe(mockUpdatedUserModel);
  //   });

  //   describe('When delete User', () => {
  //     it('Should delete a existing user', async () => {
  //       service.getUserById = jest.fn().mockReturnValueOnce(mockUserModel);

  //       await service.deleteUser('1');

  //       expect(service.getUserById).toHaveBeenCalledWith('1');
  //       expect(mockRepository.delete).toBeCalledWith(mockUserModel);
  //     });

  //     it('Should return an internal server error if repository does not delete the user', async () => {
  //       service.getUserById = jest.fn().mockReturnValueOnce(mockUserModel);
  //       mockRepository.delete.mockReturnValueOnce(null);

  //       const deletedUser = service.deleteUser('1');

  //       expect(service.getUserById).toHaveBeenCalledWith('1');
  //       expect(mockRepository.delete).toBeCalledWith(mockUserModel);
  //       expect(deletedUser).rejects.toThrow(InternalServerErrorException);
  //     });
  //   });
  // });
});
