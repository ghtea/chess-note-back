import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
//import { MongooseModule } from '@nestjs/mongoose';
import {GraphQLModule} from '@nestjs/graphql';
import { OpeningModule } from './opening/opening.module';
import { OpeningEntity } from './opening/opening.entity';
import { ConfigModule } from '@nestjs/config';
import { QuizEntity } from './quiz/quiz.entity';
import { QuizModule } from './quiz/quiz.module';
import { MemberEntity } from './member/member.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.URL_DB,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        MemberEntity,
        OpeningEntity,
        QuizEntity,
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      introspection: true,
      playground: true,
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    MemberEntity,
    OpeningModule,
    QuizModule,
  ],
})
export class AppModule {}


/*
// 배포 후에도 playground 가능하게 하려면
@Module({
  imports: [
    GraphQLModule.forRoot({
      introspection: true,
      playground: true
    }),
  ],
})

*/