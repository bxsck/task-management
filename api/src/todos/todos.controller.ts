import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoQueryDto } from './dto/todo-query.dto';
import { Todo } from './todo.entity';
import { CurrentUser } from 'src/common/decorators/current-user.docorator';

@ApiTags('todos')
@Controller('todos')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'Todo successfully created',
    type: Todo,
  })
  async create(
    @Body(new ValidationPipe()) createTodoDto: CreateTodoDto,
    @CurrentUser() user: any,
  ) {
    return this.todosService.create(createTodoDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get todos with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of todos',
    schema: {
      type: 'object',
      properties: {
        todos: { type: 'array', items: { $ref: '#/components/schemas/Todo' } },
        total: { type: 'number' },
      },
    },
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: TodoQueryDto,
    @CurrentUser() user: any,
  ) {
    const result = await this.todosService.findAll(query, user.id);
    return {
      status: HttpStatus.OK,
      message: 'Todos retrieved successfully',
      data: result,
    };
  }

  @Delete(':todoId')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({
    status: 200,
    description: 'Todo successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Todo not found',
  })
  async delete(@Param('todoId') todoId: string, @CurrentUser() user: any) {
    await this.todosService.delete(todoId, user.id);
    return {
      status: HttpStatus.OK,
      message: 'Todo deleted successfully',
    };
  }
}
