import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

export type MemberReaction = {
  likedMemberIdList: string[];
  dislikedMemberIdList: string[];
};

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
  correctSanSeriesList: string[][];

  @Column()
  markedSanSeriesList: string[][];

  @Column()
  authorId: string;

  @Column()
  isPublic: boolean;

  @Column()
  memberReaction: MemberReaction;

  @Column()
  createdDate: number;

  @Column()
  updatedDate: number;
}
