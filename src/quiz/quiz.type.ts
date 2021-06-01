import { Field, ObjectType, ID, Union } from '@nestjs/graphql';

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
