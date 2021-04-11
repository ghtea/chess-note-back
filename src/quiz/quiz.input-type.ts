import { StitchingInfo } from "@graphql-tools/delegate";
import { Field, InputType, ID } from "@nestjs/graphql";
import {MinLength, IsDateString, IsUUID} from 'class-validator';

@InputType()
export class RecordInputType {

  @Field()
  date: string;

  @Field()
  result: boolean;
}


@InputType()
export class GetListQuizInputType {
  @Field()
  idUser: string;
}

// @InputType()
// export class GetListQuizPublicInputType {
  
// }



@InputType()
export class CreateQuizInputType {

  @Field({ nullable: true })
  name?: string;

  @Field()
  side: 'white' | 'black';
  
  @Field()
  fenStart: string;

  @Field(type=>[[String]])
  listListMoveCorrect: string[][];

  @Field()
  idUser: string;

  @Field()
  isPublic: boolean;

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