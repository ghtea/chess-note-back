import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpeningEntity } from './opening.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  CreateOpeningInputType,
  GetListOpeningInputType,
} from './opening.input-type';

@Injectable()
export class OpeningService {
  constructor(
    @InjectRepository(OpeningEntity)
    private openingRepository: Repository<OpeningEntity>,
  ) {}

  // Query
  async getListOpening(
    getListOpeningInputType: GetListOpeningInputType,
  ): Promise<OpeningEntity[]> {
    const { isPublic, userId } = getListOpeningInputType;

    if (isPublic) {
      return this.openingRepository.find({ isPublic: true });
    } else {
      return this.openingRepository.find({ userId: userId });
    }
  }

  async getOpeningById(id: string): Promise<OpeningEntity> {
    return this.openingRepository.findOne({ id });
  }

  // Mutation
  async createOpening(
    createOpeningInputType: CreateOpeningInputType,
  ): Promise<OpeningEntity> {
    const { side, name, tree, userId, isPublic } = createOpeningInputType;

    const opening = this.openingRepository.create({
      id: uuid(),
      side,
      name,
      tree,
      userId,
      isPublic,
      createdDate: Date.now(),
      updatedDate: Date.now(),
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
