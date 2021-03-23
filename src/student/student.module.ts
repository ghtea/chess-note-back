import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
  ],
  providers: [
    StudentService,
    StudentResolver,
  ],
  exports: [ // 다른곳에서 StudentService을 사용할수 있게금 해주기 위해
    StudentService 
  ]
})
export class StudentModule {}
