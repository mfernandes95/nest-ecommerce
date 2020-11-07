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
            this.password = await bcrypt.hash(this.password, 10);
    }
}