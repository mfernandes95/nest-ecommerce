import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { User } from '../../src/user/entity/user.entity'

// define(User, (faker: typeof Faker, context: { roles: string[] }) => { 

//  })

define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)

    const user = new User()
    console.log('userrrr', user);
    user.name = faker.name.firstName(gender)
    user.email = `${faker.name.lastName(gender)}@email.com`
    user.password = faker.random.word()

    return user
})