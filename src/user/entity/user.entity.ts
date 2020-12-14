import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn, AfterLoad, Unique, AfterInsert, BeforeUpdate } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { MailerService } from "@nestjs-modules/mailer";

@Entity({ name: 'users' })
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
    @Column({ name: 'confirmation_token' })
    confirmationToken: string;

    @Exclude()
    @Column({ name: 'recovery_token' })
    recoverToken: string;

    // @Exclude()
    // @CreateDateColumn({ type: 'timestamp' })
    // created_at: Date

    @Exclude()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}