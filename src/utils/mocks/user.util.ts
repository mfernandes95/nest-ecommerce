import {User} from '../../user/entity/user.entity'

export default class UserUtil {
  static giveAMeAValidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'Matheus Pinheiro';
    user.password = 'pass123';
    // user.id = '1';
    return user;
  }

  static giveAMeAValidUserUpdate(): User {
    const user = new User();
    user.name = 'Matheus Fernandes Pinheiro';
    user.password = 'pass123456';

    return user;
  }
}