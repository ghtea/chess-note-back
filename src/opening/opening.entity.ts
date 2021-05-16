import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class OpeningEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  side: 'white' | 'black';

  @Column()
  tree: string;

  @Column()
  userId: string;

  @Column()
  isPublic: boolean;

  @Column()
  createdDate: number;

  @Column()
  updatedDate: number;
}
