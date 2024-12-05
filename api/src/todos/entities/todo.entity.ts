import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Todo {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  user_id: string;

  @Column()
  todo_date: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
