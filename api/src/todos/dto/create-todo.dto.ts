import { IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../todo.entity';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Todo due date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  todo_date?: Date;

  @ApiProperty({ description: 'Todo title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Todo description',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: TodoStatus,
    default: TodoStatus.TODO,
    required: false,
  })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  // @ApiProperty({ description: 'User ID who created the todo' })
  // @IsNotEmpty()
  // userId: string;
}
