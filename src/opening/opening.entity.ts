import { Entity, PrimaryColumn, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class OpeningEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  pgn: string;
  
  @Column()
  fen: string;

  @Column()
  side: 'white' | 'black';

  @Column()
  turnStart: number;

  @Column()
  numberMove: number; 
  
}

