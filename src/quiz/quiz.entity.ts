import { Entity, PrimaryColumn, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class QuizEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  //
  @Column()
  side: 'white' | 'black';

  @Column()
  fenStart: string;

  @Column()
  listMoveCorrect: string[];

  @Column()
  idUser: string;

  @Column()
  record: {date: string, result: boolean}[];
  
}

