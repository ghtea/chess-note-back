import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

export type QuizRecord = { date: number; quizId: string; result: boolean };

@Entity()
export class MemberEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column()
  quizRecordList: QuizRecord[];
}
