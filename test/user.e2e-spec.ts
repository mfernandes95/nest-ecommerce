import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entity/user.entity';
import * as SqliteConfig from '../database/config/sqlite'
import { UserService } from '../src/user/user.service';
import { Repository } from "typeorm";
import factoryUser from './factory/factories'
// import * as factory from '../database/factories/user.factory'

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService
  let repository: Repository<User>

  beforeAll(async () => {
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
    repository = moduleFixture.get('UserRepository');
    await app.init();

  });

  afterEach(async () => {
    await repository.query(`DELETE FROM users;`);
  });

  afterAll(async () => {
    await app.close();

  })

  it('/ (POST)', async () => {
    const user = factoryUser()
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)
      .expect((({ body }) => {
        expect(body.name).toEqual(user.name)
        expect(body.email).toEqual(user.email)
      }))
  });

  it('/ (GET)', async () => {
    const user = factoryUser()
    const { id, name, email } = await userService.createUser(user)

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([{
        id, name, email
      }]);
  });
});
