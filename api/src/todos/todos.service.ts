import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoQueryDto } from './dto/todo-query.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const todo = this.todoRepository.create({
      ...createTodoDto,
      userId,
      status: createTodoDto.status || TodoStatus.TODO,
    });

    return this.todoRepository.save(todo);
  }

  async findAll(
    query: TodoQueryDto,
    userId: string,
  ): Promise<{ todos: Todo[]; total: number }> {
    const { status, page = 1, limit = 10, isSortTodoDateDesc = true } = query;

    const queryBuilder = this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId });

    // Apply status filter if provided
    if (status) {
      queryBuilder.andWhere('todo.status = :status', { status });
    }

    // Apply sorting
    queryBuilder.orderBy('todo.createdAt', isSortTodoDateDesc ? 'DESC' : 'ASC');

    // Apply pagination
    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

    const [todos, total] = await queryBuilder.getManyAndCount();

    return {
      todos,
      total,
    };
  }

  async delete(todoId: string, userId: string): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
        userId,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todoRepository.remove(todo);
  }
}
