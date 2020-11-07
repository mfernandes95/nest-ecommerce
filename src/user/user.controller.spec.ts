import { Test, TestingModule } from '@nestjs/testing';
// import { AppModule } from 'src/app.module';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
        TypeOrmModule.forRoot({
          envFilePath: '.env.test',
          // @ts-ignore
          type: process.env.TYPEORM_CONNECTION,
          host: 'localhost',
          port: parseInt(process.env.TYPEORM_PORT),
          username: process.env.TYPEORM_USERNAME,
          password: process.env.TYPEORM_PASSWORD,
          database: process.env.TYPEORM_DATABASE,
          entities: [User],
          // HEREEEE
          // synchronize: true,
          // logging: true,
          // dropSchema: true,
        }),
      TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  describe('User', () => {
    it('UserController', () => {
      console.log('relou', userController.index());
      expect(userController).toBeDefined();
    });
  })

});
