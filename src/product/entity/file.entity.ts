import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Product } from "./product.entity";
import { User } from "src/user/entity/user.entity";

@Entity({ name: 'files' })
export class File {

  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  name: string;

  // @Column()
  // description: string;

  // @Column()
  // price: string;

  // @Column({ array: true })
  // images_id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // @ManyToOne(() => Product)
  // product: Product
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User
}