import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const TableName = 'product';
@Entity(TableName)
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column('')
  image: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  quantity: number;

  // @Column()
  // shop: boolean;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  content: string;
}
