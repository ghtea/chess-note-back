import { Entity, PrimaryColumn, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class OpeningEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  side: 'white' | 'black';

  @Column()
  fenStart: string;

  @Column()
  listMoveCorrect: string[];

  @Column()
  numberMove: number; 
  
}

