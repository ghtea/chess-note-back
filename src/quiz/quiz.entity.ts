import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

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
  nextTurn: 'white' | 'black';

  @Column()
  startingFen: string;

  @Column()
  correctSanSeriesList: string[][];

  @Column()
  markedSanSeriesList: string[][];

  @Column()
  authorId: string;

  @Column()
  isPublic: boolean;

  @Column()
  createdDate: number;

  @Column()
  updatedDate: number;
}
