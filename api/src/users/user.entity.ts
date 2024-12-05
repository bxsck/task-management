import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  @ApiProperty({ type: String, description: 'User ID' })
  id: string;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'User display name' })
  display_name: string;

  @Column()
  @ApiProperty({ example: 'john123', description: 'User username' })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
