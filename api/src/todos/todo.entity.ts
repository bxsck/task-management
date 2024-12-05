import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TodoStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

@Entity('todos')
export class Todo {
  @ObjectIdColumn()
  _id: string;

  @ApiProperty({ description: 'Todo ID' })
  @Column()
  id: string;

  @ApiProperty({ description: 'Todo due date', required: false })
  @Column({ nullable: true })
  todo_date?: Date;

  @ApiProperty({ description: 'Todo title' })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Todo description',
    required: false,
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    enum: TodoStatus,
    default: TodoStatus.TODO,
    description: 'Todo status',
  })
  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.TODO,
  })
  status: TodoStatus;

  @ApiProperty({ description: 'User ID who created the todo' })
  @Column()
  userId: string;

  @ApiProperty({ description: 'Todo creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Todo last update date' })
  @UpdateDateColumn()
  updatedAt: Date;
}
