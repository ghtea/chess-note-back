import { Entity, PrimaryColumn, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class QuizEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  //
  @Column()
  side: 'white' | 'black';

  @Column()
  fenStart: string;

  @Column()
  listListMoveCorrect: string[][];

  @Column()
  idUser: string;

  @Column()
  isPublic: boolean;

  @Column()
  dateCreated: number;

}

