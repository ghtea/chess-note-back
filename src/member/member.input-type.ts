import { StitchingInfo } from '@graphql-tools/delegate';
import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class QuizRecordInputType {
  @Field(() => Number)
  date: number;

  @Field(() => String)
  quizId: string;

  @Field(() => Boolean)
  result: boolean;
}

@InputType()
export class GetMemberByUserIdInputType {
  @Field()
  userId: string;
}

// @InputType()
// export class getQuizListPublicInputType {

// }

@InputType()
export class CreateMemberInputType {
  @Field()
  userId: string;
}

@InputType()
export class UpdateMemberInputType {
  @Field(() => String)
  userId: string;

  @Field(() => [QuizRecordInputType])
  quizRecordList: QuizRecordInputType[];
}

// @IsUUID("4", {each:true})
// @Field(()=>[ID], { defaultValue: [] })
// students: string[];

// @IsUUID("4", {each:true})
// @Field(()=>[ID], { defaultValue: [] })
// students: string[];

// @InputType()
// export class AssignStudentsToQuizInputType {
//   @IsUUID()
//   @Field(type=>ID)
//   lessonId: string;

//   @IsUUID("4", {each:true})
//   @Field(type=>[ID])
//   studentIds: string[];
// }
