import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningResolver } from './opening.resolver';
import { OpeningService } from './opening.service';
import { OpeningEntity } from './opening.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpeningEntity]),
    //StudentModule,
  ],
  providers: [OpeningResolver, OpeningService],
})
export class OpeningModule {}
