import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType('Opening')
export class OpeningType {

  @Field(type=>ID)
  id: string;

  @Field()
  side: 'white' | 'black';

  @Field()
  name: string;
  
  @Field(type=>[[String]])
  listListMoveCorrect: string[][];
  
  @Field()
  idUser: string; 
}


// @Field(type=>[StudentType])   
//  // 여기서 StudentType는 graphql 관련 type 이지 typescript 의 일반적인 type이 아니다!
//   // 반환할 때 student 의 아이디를 통해서 student 자체를 반환한다!!! 이걸로 호출을 한번해서 두번한 효과를 낸다!
//   // lesson.resolver.ts 에서 @ResolveField 도 적용시켜야 한다!!
//   students: string[];