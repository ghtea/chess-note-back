import { Field, ObjectType, ID, Union } from '@nestjs/graphql';

// Union Media = Book | Movie
// 어떻게 하는지 모르겠다

@ObjectType('QuizRecord')
export class QuizRecordType {
  @Field()
  date: number;

  @Field()
  quizId: string;

  @Field()
  result: boolean;
}

@ObjectType('Member')
export class MemberType {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field((type) => [QuizRecordType])
  quizRecordList: QuizRecordType[];
}

// @Field(type=>[StudentType])
//   // 반환할 때 student 의 아이디를 통해서 student 자체를 반환한다!!! 이걸로 호출을 한번해서 두번한 효과를 낸다!
//   // lesson.resolver.ts 에서 @ResolveField 도 적용시켜야 한다!!
//   students: string[];
