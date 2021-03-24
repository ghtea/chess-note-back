import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';
import {QuizEntity} from './quiz.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity]),
    StudentModule,
  ],
  providers: [
    QuizResolver,
    QuizService
  ]
})
export class QuizModule {}
