import { Test, TestingModule } from '@nestjs/testing';
// import { AppModule } from 'src/app.module';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    console.log('routdjnosandsj');
    // userService = new UserService()
    // userController = new UserController(userController)
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [UserDto, User, UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  describe('User', () => {
    it('should be defined', () => {
      console.log('relou', userController);
      // expect(userController.index)
    });
  })

});
