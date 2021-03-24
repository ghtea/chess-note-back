import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
//import { MongooseModule } from '@nestjs/mongoose';
import {GraphQLModule} from '@nestjs/graphql';
import { OpeningModule } from './opening/opening.module';
import { OpeningEntity } from './opening/opening.entity';
import {Student} from './student/student.entity';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.URL_DB,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        OpeningEntity,
        Student
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      introspection: true,
      playground: true
    }),
    OpeningModule,
    StudentModule,
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