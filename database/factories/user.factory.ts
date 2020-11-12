import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { User } from '../../src/user/entity/user.entity'

define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1)

    const user = new User()
    user.name = faker.name.firstName(gender)
    user.email = faker.internet.email()
    user.password = faker.random.word()

    return user
})