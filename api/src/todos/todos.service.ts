import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoQueryDto } from './dto/todo-query.dto';
import { v4 } from 'uuid';

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
      id: v4(),
      status: createTodoDto.status || TodoStatus.TODO,
    });

    return this.todoRepository.save(todo);
  }

  async getTodoList(
    query: TodoQueryDto,
    userId: string,
  ): Promise<{ todos: Todo[]; total: number }> {
    const {
      status,
      limit = 10,
      offset: page = 1,
      isSortTodoDateDesc = false,
    } = query;

    const filter: any = { userId };
    if (status) {
      filter.status = status;
    }
    const sort: FindOptionsOrder<Todo> = {
      todo_date: isSortTodoDateDesc ? 'DESC' : 'ASC',
    };

    const [todos, total] = await Promise.all([
      this.todoRepository.find({
        where: filter,
        order: sort,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.todoRepository.count({
        ...filter,
      }),
    ]);

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
