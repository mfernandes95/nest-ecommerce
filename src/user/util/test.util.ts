import { User } from '../entity/user.entity'
import { name, internet } from 'faker';

export default class TestUtil {
  static giveAMeAValidUser(): User {
    const user = new User();
    user.email = internet.email();
    user.name = name.firstName();
    user.password = internet.password()
    user.id = '9a74f86c-ec77-4a93-bdfe-3894a47c9967';
    return user;
  }

  static giveAMeAValidUserUpdate(): User {
    const user = new User();
    user.name = name.firstName();
    user.password = internet.password()

    return user;
  }
}