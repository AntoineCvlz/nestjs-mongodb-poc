import { Entity, ObjectIdColumn, Column, ObjectId, CreateDateColumn } from 'typeorm';

@Entity('positions-user')
export class PositionsUser {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn()
  livreur_id: string;

  @Column({ type: 'json' }) // A verif
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  @Column()
  speed_kmh: number;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
