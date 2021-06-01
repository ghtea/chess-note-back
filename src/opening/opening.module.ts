import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningResolver } from './opening.resolver';
import { OpeningService } from './opening.service';
import { OpeningEntity } from './opening.entity';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([OpeningEntity]), MemberModule],
  providers: [OpeningResolver, OpeningService],
})
export class OpeningModule {}
