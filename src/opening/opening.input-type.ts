import { StitchingInfo } from '@graphql-tools/delegate';
import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class MemberReactionInputType {
  @Field(() => [String])
  likedMemberIdList: string[];

  @Field(() => [String])
  dislikedMemberIdList: string[];
}

@InputType()
export class GetOpeningListInputType {
  @Field({ nullable: true })
  userId?: string;
}

@InputType()
export class GetOpeningByIdInputType {
  @Field()
  id: string;

  @Field({ nullable: true })
  userId?: string;
}

@InputType()
export class CreateOpeningInputType {
  @Field()
  name: string;

  @Field()
  side: 'white' | 'black';

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
export class UpdateOpeningInputType {
  @Field()
  userId: string; // authorId 은 애초에 퀴즈에 저장되어있던거고 userId 는 앱 상의 사용자

  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  side: 'white' | 'black';

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
export class DeleteOpeningInputType {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;
}

@InputType()
export class LikeDislikeOpeningInputType {
  @Field((type) => ID)
  openingId: string;

  @Field()
  userId: string;

  @Field()
  like: boolean;

  @Field()
  dislike: boolean;
}
