import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { User } from "../../user/entity/user.entity";

@Entity({ name: 'products' })
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ array: true })
  images: string;

  @Column({ name: 'user_id' })
  userId: string;

  // @Exclude()
  // @CreateDateColumn({ type: 'timestamp' })
  // created_at: Date

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User
}