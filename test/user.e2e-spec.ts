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
import { AuthService } from '../src/auth/shared/auth.service';
import { AuthModule } from '../src/auth/auth.module';
// import * as factory from '../database/factories/user.factory'

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService
  let authService: AuthService
  let repository: Repository<User>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        AuthModule,
        TypeOrmModule.forRoot(SqliteConfig),
        TypeOrmModule.forFeature([User])
      ],
      providers: [UserService],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    authService = moduleFixture.get<AuthService>(AuthService);
    repository = moduleFixture.get('UserRepository');
    await app.init();

  });

  afterEach(async () => {
    await repository.query(`DELETE FROM users;`);
  });

  afterAll(async () => {
    await app.close();

  })

  it('Should create a user', async () => {
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

  it('Should get all users', async () => {
    const user = factoryUser()
    const userCreated = await userService.createUser(user)
    const jwt = authService.login(userCreated)

    return request(app.getHttpServer())
      .get('/users')
      .set("Authorization", `Bearer ${jwt.access_token}`)
      .expect(200)
      .expect([{
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email
      }]);
  });

  it('Should get a user by id', async () => {
    const user = factoryUser()
    const userCreated = await userService.createUser(user)
    const jwt = authService.login(userCreated)

    return request(app.getHttpServer())
      .get(`/users/${userCreated.id}`)
      .set("Authorization", `Bearer ${jwt.access_token}`)
      .expect(200)
      .expect({
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email
      });
  });

  it('Should delete a user by id', async () => {
    const user = factoryUser()
    const userCreated = await userService.createUser(user)
    const jwt = authService.login(userCreated)

    return request(app.getHttpServer())
      .delete(`/users/${userCreated.id}`)
      .set("Authorization", `Bearer ${jwt.access_token}`)
      .expect(204)
    //     .expect({
    //       id: userCreated.id,
    //       name: userCreated.name,
    //       email: userCreated.email
    //     });
  });

  it('Should delete a user by id', async () => {
    const user = factoryUser()
    const userCreated = await userService.createUser(user)
    const jwt = authService.login(userCreated)

    const { name, password } = factoryUser()

    return request(app.getHttpServer())
      .put(`/users/${userCreated.id}`)
      .set("Authorization", `Bearer ${jwt.access_token}`)
      .send({ name, password })
      .expect(200)
      .expect({
        id: userCreated.id,
        name,
        email: userCreated.email
      });
  });
});
