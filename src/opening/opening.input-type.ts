import { StitchingInfo } from '@graphql-tools/delegate';
import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

@InputType()
export class GetListOpeningInputType {
  @Field()
  isPublic: boolean;

  @Field({ nullable: true })
  userId?: string;
}

@InputType()
export class CreateOpeningInputType {
  @Field()
  side: 'white' | 'black';

  @Field()
  name: string;

  @Field()
  tree: string;

  @Field()
  userId: string;

  @Field()
  isPublic: boolean;
}
