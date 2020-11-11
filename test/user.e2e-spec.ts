import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entity/user.entity';
// import { User } from 'src/user/entity/user.entity';
// import { AppModule } from './../src/app.module';
import * as SqliteConfig from '../database/config/sqlite'
import { UserService } from '../src/user/user.service';
import UserUtil from '../src/utils/mocks/user.util';
import { createConnection, getConnection } from "typeorm";
import { QueryRunner } from 'typeorm';


describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot(SqliteConfig),
        TypeOrmModule.forFeature([User])
      ],
      providers: [UserService],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();
    // await queryRunner.connect();

  });

  // afterEach(async () => {
  //   await queryRunner.rollbackTransaction();
  // })

  // afterEach(async() => {
  //   createConnection(SqliteConfig).then(async connection => {
  //   console.log('connn', connection);
  //     await connection
  //       .getRepository(User)
  //       .createQueryBuilder()
  //       .restore()

  //   }).catch(error => console.log(error));

  // })

  it('/ (POST)', async () => {
    const { name, email, password } = UserUtil.giveAMeAValidUser()
    return request(app.getHttpServer())
      .post('/users')
      .send({ name, email, password })
      .expect(201)
      .expect((({ body }) => {
        expect(body.name).toEqual(name)
        expect(body.email).toEqual(email)
      }))
  });

  it('/ (GET)', async () => {
    const { id, name, email } = await userService.createUser({
      name: 'Jota',
      email: 'jota@email.com',
      password: '123456'
    })

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      // .expect([{
      //   id, name, email
      // }]);
  });
});
