import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType('MemberReaction')
export class MemberReactionType {
  @Field(() => [String])
  likedMemberIdList: string[];

  @Field(() => [String])
  dislikedMemberIdList: string[];
}

@ObjectType('Opening')
export class OpeningType {
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

// @Field(type=>[StudentType])
//  // 여기서 StudentType는 graphql 관련 type 이지 typescript 의 일반적인 type이 아니다!
//   // 반환할 때 student 의 아이디를 통해서 student 자체를 반환한다!!! 이걸로 호출을 한번해서 두번한 효과를 낸다!
//   // lesson.resolver.ts 에서 @ResolveField 도 적용시켜야 한다!!
//   students: string[];
