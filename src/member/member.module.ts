import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { MemberEntity } from './member.entity';
//import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberEntity]),
    // StudentModule,
  ],
  providers: [MemberResolver, MemberService],
  exports: [
    // 다른곳에서 MemberService 을 사용할수 있게금 해주기 위해
    MemberService,
  ],
})
export class MemberModule {}
