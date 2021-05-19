import { Field, ObjectType, ID, Union } from '@nestjs/graphql';
//import { Memo } from "./quiz.entity";

// Union Media = Book | Movie
// 어떻게 하는지 모르겠다

// @ObjectType('Memo')
// export class MemoType {

//   @Field()
//   seriesSan: string;

//   @Field()
//   content: string;
// }

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

// @Field(type=>[StudentType])
//   // 반환할 때 student 의 아이디를 통해서 student 자체를 반환한다!!! 이걸로 호출을 한번해서 두번한 효과를 낸다!
//   // lesson.resolver.ts 에서 @ResolveField 도 적용시켜야 한다!!
//   students: string[];
