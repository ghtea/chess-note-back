import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {OpeningEntity} from './opening.entity';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { CreateOpeningInputType } from './opening.input-type';

@Injectable()
export class OpeningService {
  constructor(
    @InjectRepository(OpeningEntity) private openingRepository: Repository<OpeningEntity>
  ) {}

  // Query
  async getListOpening(): Promise<OpeningEntity[]> {
    return this.openingRepository.find();
  }

  async getOpeningById(id:string): Promise<OpeningEntity> {
    return this.openingRepository.findOne({id});
  }

  
  // Mutation
  async createOpening(createOpeningInputType: CreateOpeningInputType): Promise<OpeningEntity> {

    const {pgn, fen, side, turnStart, numberMove} = createOpeningInputType;

    const opening = this.openingRepository.create({
      id: uuid(),
      pgn,
      fen, 
      side,
      turnStart,
      numberMove,
    });

    return this.openingRepository.save(opening);
  }


}



// async assignStudentsToOpening(assignStudentsToOpeningInput: AssignStudentsToOpeningInput):Promise<Opening> {
//   const {openingId, studentIds} = assignStudentsToOpeningInput;
  
//   const opening = await this.openingRepository.findOne({id: openingId});
//   opening.students = [...new Set([...opening.students, ...studentIds])];
//   return this.openingRepository.save(opening);
// }