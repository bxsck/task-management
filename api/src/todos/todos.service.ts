import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  create(todo: CreateTodoDto) {
    return this.todoRepository.save(todo);
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  // update(id: number, updateTodoDto: UpdateTodoDto) {
  //   return `This action updates a #${id} todo`;
  // }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
