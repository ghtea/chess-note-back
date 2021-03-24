import { StitchingInfo } from "@graphql-tools/delegate";
import { Field, InputType, ID } from "@nestjs/graphql";
import {MinLength, IsDateString, IsUUID} from 'class-validator';

@InputType()
export class CreateOpeningInputType {

  @Field()
  pgn: string;
  
  @Field()
  fen: string;

  @Field()
  side: 'white' | 'black';

  @Field()
  turnStart: number;

  @Field()
  numberMove: number;
}

// @IsUUID("4", {each:true})
// @Field(()=>[ID], { defaultValue: [] })
// students: string[];

// @IsUUID("4", {each:true})
// @Field(()=>[ID], { defaultValue: [] })
// students: string[];


// @InputType()
// export class AssignStudentsToOpeningInputType {
//   @IsUUID()
//   @Field(type=>ID)
//   lessonId: string;

//   @IsUUID("4", {each:true})
//   @Field(type=>[ID])
//   studentIds: string[];
// }