import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { User } from "../../user/entity/user.entity";
import { File } from './file.entity'

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

  // @Column({ array: true })
  // images_id: string;

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

  @OneToMany(type => File, files => files.product, {
    eager: true,
  })
  files: File[];

  // @OneToMany(() => File)
  // @JoinColumn({ name: 'imagesId' })
  // file: File

  // @OneToMany(
  //   () => File,
  //   file => file.userId,
  // )
  // @JoinColumn({ name: 'imagesId' })
  // file: File;
}