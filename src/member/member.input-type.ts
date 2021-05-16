import { StitchingInfo } from '@graphql-tools/delegate';
import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class RecordQuizInputType {
  @Field()
  date: number;

  @Field()
  idQuiz: string;

  @Field()
  result: boolean;
}

@InputType()
export class GetMemberByuserIdInputType {
  @Field()
  userId: string;
}

// @InputType()
// export class GetListQuizPublicInputType {

// }

@InputType()
export class CreateMemberInputType {
  @Field()
  userId: string;
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
