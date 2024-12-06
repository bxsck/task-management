import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { TodoStatus } from '../todo.entity';

export class TodoQueryDto {
  @ApiPropertyOptional({
    enum: TodoStatus,
    description: 'Filter todos by status',
  })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @ApiPropertyOptional({
    type: Number,
    description: 'Page number',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    type: Number,
    description: 'Number of items per page',
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    type: Number,
    description:
      'Number of items to skip before starting to collect the result set',
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Sort todos by date in descending order',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isSortTodoDateDesc?: boolean = true;
}
