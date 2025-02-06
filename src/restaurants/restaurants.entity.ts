import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('restaurants')
export class Restaurants {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ type: 'json' })
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
}
