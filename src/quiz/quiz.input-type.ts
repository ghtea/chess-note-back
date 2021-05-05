import { StitchingInfo } from "@graphql-tools/delegate";
import { Field, InputType, ID, createUnionType, registerEnumType } from "@nestjs/graphql";
import {MinLength, IsDateString, IsUUID} from 'class-validator';
import { RecordQuizInputType } from "src/member/member.input-type";



@InputType()
export class GetListQuizInputType {
  @Field({nullable: true})
  idUser?: string;
}


@InputType()
export class GetQuizByIdInputType {

  @Field()
  id: string;

  @Field({nullable: true})
  idUser?: string;
}


@InputType()
export class GetDictListQuizInputType {
  @Field({nullable: true})
  idUser?: string;
}

// @InputType()
// export class MemoInputType {

//   @Field()
//   seriesSan: string;

//   @Field()
//   content: string;
// }



// ['all-public', 'all-public-with-record', 'only-mine-with-record']
export enum KindGetFocusListQuiz {
  publicQuiz = 'public-quiz',
  publicQuizByRecord = 'public-quiz-by-record',
  myQuizByRecord = 'my-quiz-by-record',
}
registerEnumType(KindGetFocusListQuiz, { name: 'KindGetFocusListQuiz' });


@InputType()
export class GetFocusListQuizInputType {

  @Field(()=>KindGetFocusListQuiz)
  kind: KindGetFocusListQuiz ;

  @Field(()=>[RecordQuizInputType], {nullable: true})
  listRecordQuizOfUser?: RecordQuizInputType[]

  @Field({nullable: true})
  idUser?: string;
}





@InputType()
export class CreateQuizInputType {

  @Field({ nullable: true })
  name?: string;

  @Field()
  turnNext: 'white' | 'black';
  
  @Field()
  fenStart: string;

  @Field(type=>[[String]])
  listSeriesSanCorrect: string[][];

  @Field(type=>[[String]])
  listSeriesSanMention: string[][];

  @Field()
  idUser: string;

  @Field()
  isPublic: boolean;

}




@InputType()
export class UpdateQuizInputType {

  @Field(type=>ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  turnNext: 'white' | 'black';
  
  @Field()
  fenStart: string;

  @Field(type=>[[String]])
  listSeriesSanCorrect: string[][];

  @Field(type=>[[String]])
  listSeriesSanMention: string[][];
  

  // @Field()
  // idUser: string;

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