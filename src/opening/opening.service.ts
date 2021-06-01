import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpeningEntity } from './opening.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  CreateOpeningInputType,
  GetOpeningListInputType,
  GetOpeningByIdInputType,
  UpdateOpeningInputType,
  DeleteOpeningInputType,
  LikeDislikeOpeningInputType,
} from './opening.input-type';

@Injectable()
export class OpeningService {
  constructor(
    @InjectRepository(OpeningEntity)
    private openingRepository: Repository<OpeningEntity>,
  ) {}

  // Query
  async getOpeningList(
    getOpeningListInput: GetOpeningListInputType,
  ): Promise<OpeningEntity[]> {
    const { userId } = getOpeningListInput;
    let entireOpeningList: OpeningEntity[] = [];
    try {
      entireOpeningList = await this.openingRepository.find({ isPublic: true });

      if (userId) {
        const myOpeningList = await this.openingRepository.find({
          authorId: userId,
        });
        entireOpeningList = entireOpeningList.concat(myOpeningList);
      }

      // 중복 제거
      const openingIdListWithoutDuplicate: string[] = [];
      entireOpeningList = entireOpeningList.filter((e) => {
        if (openingIdListWithoutDuplicate.includes(e.id)) {
          return false;
        } else {
          openingIdListWithoutDuplicate.push(e.id);
          return true;
        }
      });
      //console.log(entireOpeningList)

      return entireOpeningList;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOpeningById(
    getOpeningByIdInputType: GetOpeningByIdInputType,
  ): Promise<OpeningEntity> {
    const { id, userId } = getOpeningByIdInputType;

    try {
      const result = await this.openingRepository.findOne({ id });

      if (!result) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'There is no opening with that id',
          },
          HttpStatus.NOT_FOUND,
        );
      } else if (!result.isPublic && result.authorId !== userId) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error:
              'This opening is not public and the user is not owner of this opening',
          },
          HttpStatus.FORBIDDEN,
        );
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Mutation
  async createOpening(
    createOpeningInputType: CreateOpeningInputType,
  ): Promise<OpeningEntity> {
    const {
      name,
      side,
      correctSanSeriesList,
      markedSanSeriesList,
      authorId,
      isPublic,
    } = createOpeningInputType;

    try {
      const opening: OpeningEntity = this.openingRepository.create({
        id: uuid(),
        name,
        side,
        correctSanSeriesList,
        markedSanSeriesList,
        authorId,
        isPublic,
        memberReaction: {
          likedMemberIdList: [],
          dislikedMemberIdList: [],
        },
        createdDate: Date.now(),
        updatedDate: Date.now(),
      });

      const result = await this.openingRepository.save(opening, {});
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOpening(
    updateOpeningInput: UpdateOpeningInputType,
  ): Promise<OpeningEntity> {
    const { userId, id } = updateOpeningInput;

    try {
      const openingToUpdate = await this.openingRepository.findOne({ id });

      if (!openingToUpdate) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'There is no opening with that id',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        if (userId !== openingToUpdate.authorId) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'You are not allowed to update this opening',
            },
            HttpStatus.FORBIDDEN,
          );
        } else {
          const result = await this.openingRepository.save({
            ...openingToUpdate,
            ...updateOpeningInput,
            updatedDate: Date.now(),
          });
          return result;
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOpening(
    deleteOpeningInput: DeleteOpeningInputType,
  ): Promise<boolean> {
    const { id, userId } = deleteOpeningInput;

    try {
      const openingToDelete = await this.openingRepository.findOne({ id });

      if (!openingToDelete) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'There is no opening with that id',
          },
          HttpStatus.NOT_FOUND,
        );
      } else if (userId !== openingToDelete.authorId) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'You are not allowed to delete this opening',
          },
          HttpStatus.FORBIDDEN,
        );
      } else {
        await this.openingRepository.delete({ id });
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async likeDislikeOpening(
    likeDislikeOpeningInput: LikeDislikeOpeningInputType,
  ): Promise<OpeningEntity> {
    const { like, dislike, openingId, userId } = likeDislikeOpeningInput;

    try {
      const openingToUpdate = await this.openingRepository.findOne({
        id: openingId,
      });

      if (!openingToUpdate) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'There is no opening with that id',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        if (userId !== openingToUpdate.authorId) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'You are not allowed to update this opening',
            },
            HttpStatus.FORBIDDEN,
          );
        } else {
          const newMemberReaction = { ...openingToUpdate.memberReaction };
          newMemberReaction.likedMemberIdList = newMemberReaction.likedMemberIdList.filter(
            (e) => e !== userId,
          );
          newMemberReaction.dislikedMemberIdList = newMemberReaction.dislikedMemberIdList.filter(
            (e) => e !== userId,
          );
          if (like) {
            newMemberReaction.likedMemberIdList = newMemberReaction.likedMemberIdList.concat(
              [userId],
            );
          }
          if (dislike) {
            newMemberReaction.dislikedMemberIdList = newMemberReaction.dislikedMemberIdList.concat(
              [userId],
            );
          }

          const result = await this.openingRepository.save({
            ...openingToUpdate,
            memberReaction: newMemberReaction,
            updatedDate: Date.now(),
          });
          return result;
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// async assignStudentsToOpening(assignStudentsToOpeningInput: AssignStudentsToOpeningInput):Promise<Opening> {
//   const {openingId, studentIds} = assignStudentsToOpeningInput;

//   const opening = await this.openingRepository.findOne({id: openingId});
//   opening.students = [...new Set([...opening.students, ...studentIds])];
//   return this.openingRepository.save(opening);
// }
