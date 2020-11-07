import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, AfterInsert } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            console.log('HERR', await bcrypt.hash('batata', 10))
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            console.log(error);
        }
    }

    //   async comparePassword(attempt: string): Promise<boolean> {
    //     return await bcrypt.compare(attempt, this.password);
    //   }

    //   toResponseObject(showToken: boolean = true): UserResponse {
    //     const { id, name, email } = this;
    //     const responseObject: UserResponse = {
    //       id,
    //       name,
    //       email,
    //     };

    //     return responseObject;
    // }
}