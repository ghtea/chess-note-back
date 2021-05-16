import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';
import { QuizEntity } from './quiz.entity';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity]), MemberModule],
  providers: [QuizResolver, QuizService],
})
export class QuizModule {}
