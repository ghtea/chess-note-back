import { Field, ObjectType, ID, Union } from '@nestjs/graphql';
import { MemberReaction } from './quiz.entity';
//import { Memo } from "./quiz.entity";

// Union Media = Book | Movie
// 어떻게 하는지 모르겠다

@ObjectType('MemberReaction')
export class MemberReactionType {
  @Field(() => [String])
  likedMemberIdList: string[];

  @Field(() => [String])
  dislikedMemberIdList: string[];
}

@ObjectType('Quiz')
export class QuizType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  nextTurn: 'white' | 'black';

  @Field()
  startingFen: string;

  @Field((type) => [[String]])
  correctSanSeriesList: string[][];

  @Field((type) => [[String]])
  markedSanSeriesList: string[][];

  @Field()
  authorId: string;

  @Field() // resovlefield!
  authorName: string;

  @Field()
  isPublic: boolean;

  @Field()
  memberReaction: MemberReactionType;

  @Field()
  createdDate: number;

  @Field()
  updatedDate: number;
}

@ObjectType('QuizListDict')
export class QuizListDictType {
  @Field((type) => [QuizType])
  publicQuizList: QuizType[];

  @Field((type) => [QuizType])
  myQuizList: QuizType[];
}
