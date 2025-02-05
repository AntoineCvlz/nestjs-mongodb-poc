import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() // Identifiant unique MongoDB
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;
}