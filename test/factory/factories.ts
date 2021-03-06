import { name, internet } from 'faker';
import { CreateUserDto } from 'src/user/dto/user.dto';

const factoryUser = () => {
    // const user = new User();
    // user.email = internet.email()
    // user.name = name.firstName();
    // user.password = internet.password();
    // return user;
    const password = internet.password()

    const user: CreateUserDto = {
        name: name.firstName(),
        email: internet.email(),
        password: password,
        confirmed_password: password,
    }

    return user
};

export default factoryUser