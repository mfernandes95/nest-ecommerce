import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../../src/user/entity/user.entity'

// export default class CreateUsers implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     await connection
//       .createQueryBuilder()
//       .insert()
//       .into(User)
//       .values([
//         { name: 'Timber', email: 'Saw@email.com', password: '123456' },
//         { name: 'Phantom', email: 'Lancer@email.com', password: '123456' },
//       ])
//       .execute()
//   }
// }

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(User)().createMany(10)
    }
}