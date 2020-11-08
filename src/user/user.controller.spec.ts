import { Test, TestingModule } from '@nestjs/testing';
// import { AppModule } from 'src/app.module';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as SqliteConfig from '.././../database/config/sqlite';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ConfigModule.forRoot({
        //   envFilePath: '.env.test',
        // }),
        TypeOrmModule.forRoot(SqliteConfig),
        TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('User', () => {
    it('UserController', () => {
      console.log('relou', userController);
      expect(userController).toBeDefined();
    });

    it('UserService', () => {
      console.log('relou', userService);
      expect(userService).toBeDefined();
    });
  })

  describe('User', () => {
    it('Should get users', async () => {
      const result = await userService.createUser({
        name: 'Matheus',
        email: 'msamsa@email.com',
        password: "wdawd"
      })

      console.log('resss', result);

      // jest.spyOn(userService, 'find')
      //   .mockImplementationOnce(async () => ( id: 'my-id' ));
      // console.log('333333333', await userService.find());
      expect(await userService.find()).toEqual([result])
    });
  })
});
