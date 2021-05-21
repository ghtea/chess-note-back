import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from './quiz.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  CreateQuizInputType,
  GetQuizListInputType,
  GetQuizByIdInputType,
  UpdateQuizInputType,
  DeleteQuizInputType,
  LikeDislikeQuizInputType,
} from './quiz.input-type';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private quizRepository: Repository<QuizEntity>,
  ) {}

  // Query
  async getQuizList(
    getQuizListInput: GetQuizListInputType,
  ): Promise<QuizEntity[]> {
    const { userId } = getQuizListInput;
    let entireQuizList: QuizEntity[] = [];
    try {
      entireQuizList = await this.quizRepository.find({ isPublic: true });

      if (userId) {
        const myQuizList = await this.quizRepository.find({ authorId: userId });
        entireQuizList = entireQuizList.concat(myQuizList);
      }

      // 중복 제거
      const quizIdListWithoutDuplicate: string[] = [];
      entireQuizList = entireQuizList.filter((e) => {
        if (quizIdListWithoutDuplicate.includes(e.id)) {
          return false;
        } else {
          quizIdListWithoutDuplicate.push(e.id);
          return true;
        }
      });
      //console.log(entireQuizList)

      return entireQuizList;
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

  async getQuizById(
    getQuizByIdInputType: GetQuizByIdInputType,
  ): Promise<QuizEntity> {
    const { id, userId } = getQuizByIdInputType;

    try {
      const result = await this.quizRepository.findOne({ id });

      if (!result) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'There is no quiz with that id',
          },
          HttpStatus.NOT_FOUND,
        );
      } else if (!result.isPublic && result.authorId !== userId) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error:
              'This quiz is not public and the user is not owner of this quiz',
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
  async createQuiz(
    createQuizInputType: CreateQuizInputType,
  ): Promise<QuizEntity> {
    const {
      name,
      nextTurn,
      startingFen,
      correctSanSeriesList,
      markedSanSeriesList,
      authorId,
      isPublic,
    } = createQuizInputType;

    try {
      const quiz: QuizEntity = this.quizRepository.create({
        id: uuid(),
        name,
        nextTurn,
        startingFen,
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

      const result = await this.quizRepository.save(quiz, {});
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

  async updateQuiz(updateQuizInput: UpdateQuizInputType): Promise<QuizEntity> {
    const { userId, id } = updateQuizInput;

    try {
      const quizToUpdate = await this.quizRepository.findOne({ id });

      if (!quizToUpdate) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'There is no quiz with that id',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        if (userId !== quizToUpdate.authorId) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'You are not allowed to update this quiz',
            },
            HttpStatus.FORBIDDEN,
          );
        } else {
          const result = await this.quizRepository.save({
            ...quizToUpdate,
            ...updateQuizInput,
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

  async deleteQuiz(deleteQuizInput: DeleteQuizInputType): Promise<boolean> {
    const { id, userId } = deleteQuizInput;

    try {
      const quizToDelete = await this.quizRepository.findOne({ id });

      if (!quizToDelete) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'There is no quiz with that id',
          },
          HttpStatus.NOT_FOUND,
        );
      } else if (userId !== quizToDelete.authorId) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'You are not allowed to delete this quiz',
          },
          HttpStatus.FORBIDDEN,
        );
      } else {
        await this.quizRepository.delete({ id });
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

  async likeDislikeQuiz(
    likeDislikeQuizInput: LikeDislikeQuizInputType,
  ): Promise<QuizEntity> {
    const { like, dislike, quizId, userId } = likeDislikeQuizInput;

    try {
      const quizToUpdate = await this.quizRepository.findOne({ id: quizId });

      if (!quizToUpdate) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'There is no quiz with that id',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        if (userId !== quizToUpdate.authorId) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'You are not allowed to update this quiz',
            },
            HttpStatus.FORBIDDEN,
          );
        } else {
          const newMemberReaction = { ...quizToUpdate.memberReaction };
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

          const result = await this.quizRepository.save({
            ...quizToUpdate,
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

// async assignStudentsToQuiz(assignStudentsToQuizInput: AssignStudentsToQuizInput):Promise<Quiz> {
//   const {quizId, studentIds} = assignStudentsToQuizInput;

//   const quiz = await this.quizRepository.findOne({id: quizId});
//   quiz.students = [...new Set([...quiz.students, ...studentIds])];
//   return this.quizRepository.save(quiz);
// }
