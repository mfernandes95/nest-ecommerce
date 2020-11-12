import { User } from '../../src/user/entity/user.entity'
import { name, internet } from 'faker';

const factoryUser = () => {
    const user = new User();
    user.email = internet.email()
    user.name = name.firstName();
    user.password = internet.password();
    return user;
};

export default factoryUser