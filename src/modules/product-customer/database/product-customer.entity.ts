import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/database/category.entity';

export const TableName = 'product-customer';
@Entity(TableName)
export class ProductCustomer {
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

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
