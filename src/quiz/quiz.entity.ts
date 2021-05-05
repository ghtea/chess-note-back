import { Entity, PrimaryColumn, Column, ObjectIdColumn } from "typeorm";


// export type Memo = {
//   seriesSan: string[];
//   kind: string;
// }

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
  turnNext: 'white' | 'black';

  @Column()
  fenStart: string;

  @Column()
  listSeriesSanCorrect: string[][];

  @Column()
  listSeriesSanMention: string[][];

  @Column()
  idUser: string;

  @Column()
  isPublic: boolean;

  @Column()
  dateCreated: number;

  @Column()
  dateUpdated: number;

}

