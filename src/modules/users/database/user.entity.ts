import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TableName = 'users';

@Entity(TableName)
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userName: string;

  @Column('')
  email: string;

  @Column('')
  password: string;

  @Column()
  role: number;
}
