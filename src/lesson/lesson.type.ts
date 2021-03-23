import { Field, ObjectType, ID } from "@nestjs/graphql";
import { StudentType } from "src/student/student.type";

@ObjectType('Lesson')
export class LessonType {

  @Field(type=>ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
  
  @Field(type=>[StudentType]) 
  // 반환할 때 student 의 아이디를 통해서 student 자체를 반환한다!!! 이걸로 호출을 한번해서 두번한 효과를 낸다!
  // lesson.resolver.ts 에서 @ResolveField 도 적용시켜야 한다!!
  students: string[];
}