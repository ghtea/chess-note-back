import { StitchingInfo } from '@graphql-tools/delegate';
import {
  Field,
  InputType,
  ID,
  createUnionType,
  registerEnumType,
} from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';
import { MemberReaction } from './quiz.entity';
// import { QuizRecordInputType } from 'src/member/member.input-type';

@InputType()
export class MemberReactionInputType {
  @Field(() => [String])
  likedMemberIdList: string[];

  @Field(() => [String])
  dislikedMemberIdList: string[];
}

@InputType()
export class GetQuizListInputType {
  @Field({ nullable: true })
  userId?: string;
}

@InputType()
export class GetQuizByIdInputType {
  @Field()
  id: string;

  @Field({ nullable: true })
  userId?: string;
}

// @InputType()
// export class MemoInputType {

//   @Field()
//   seriesSan: string;

//   @Field()
//   content: string;
// }

@InputType()
export class CreateQuizInputType {
  @Field({ nullable: true })
  name?: string;

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

  @Field()
  isPublic: boolean;
}

@InputType()
export class UpdateQuizInputType {
  @Field()
  userId: string; // authorId 은 애초에 퀴즈에 저장되어있던거고 userId 는 앱 상의 사용자

  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

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

  @Field()
  isPublic: boolean;

  @Field((type) => MemberReactionInputType)
  memberReaction: MemberReactionInputType;
}

@InputType()
export class DeleteQuizInputType {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;
}

@InputType()
export class LikeDislikeQuizInputType {
  @Field((type) => ID)
  quizId: string;

  @Field()
  userId: string;

  @Field()
  like: boolean;

  @Field()
  dislike: boolean;
}
