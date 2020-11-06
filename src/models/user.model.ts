import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
import {Exclude} from 'class-transformer';
//
@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @CreateDateColumn({type: 'timestamp'})
    created_at: Date
}