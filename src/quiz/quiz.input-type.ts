import { StitchingInfo } from '@graphql-tools/delegate';
import {
  Field,
  InputType,
  ID,
  createUnionType,
  registerEnumType,
} from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';
// import { QuizRecordInputType } from 'src/member/member.input-type';

@InputType()
export class getQuizListInputType {
  @Field({ nullable: true })
  userId?: string;
}

@InputType()
export class GetQuizByIdInputType {
  @Field()
  id: string;

  @Field({ nullable: true })
  userId?: string;
}

@InputType()
export class GetQuizListDictInputType {
  @Field({ nullable: true })
  userId?: string;
}

// @InputType()
// export class MemoInputType {

//   @Field()
//   seriesSan: string;

//   @Field()
//   content: string;
// }

@InputType()
export class CreateQuizInputType {
  @Field({ nullable: true })
  name?: string;

  @Field()
  nextTurn: 'white' | 'black';

  @Field()
  startingFen: string;

  @Field((type) => [[String]])
  correctSanSeriesList: string[][];

  @Field((type) => [[String]])
  markedSanSeriesList: string[][];

  @Field()
  userId: string;

  @Field()
  isPublic: boolean;
}

@InputType()
export class UpdateQuizInputType {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  nextTurn: 'white' | 'black';

  @Field()
  startingFen: string;

  @Field((type) => [[String]])
  correctSanSeriesList: string[][];

  @Field((type) => [[String]])
  markedSanSeriesList: string[][];

  // @Field()
  // userId: string;

  @Field()
  isPublic: boolean;
}

// @Field(type=>[MemoInputType])
// listMemo: Memo[];

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
