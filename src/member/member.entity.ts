import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class MemberEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  quizRecordList: { date: number; idQuiz: string; result: boolean }[];
}
