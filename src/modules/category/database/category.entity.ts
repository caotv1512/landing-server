import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
 
export const TableName = 'category';
@Entity(TableName)
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
