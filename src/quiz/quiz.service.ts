import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {QuizEntity} from './quiz.entity';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { CreateQuizInputType } from './quiz.input-type';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>
  ) {}

  // Query
  async getListQuiz(): Promise<QuizEntity[]> {
    return this.quizRepository.find();
  }

  async getQuizById(id:string): Promise<QuizEntity> {
    return this.quizRepository.findOne({id});
  }

  
  // Mutation
  async createQuiz(createQuizInputType: CreateQuizInputType): Promise<QuizEntity> {

    const {side, fenStart, listListMoveCorrect, idUser} = createQuizInputType;

    const quiz = this.quizRepository.create({
      id: uuid(),
      side,
      fenStart, 
      listListMoveCorrect,
      idUser,
      record: []
    });

    return this.quizRepository.save(quiz);
  }


}



// async assignStudentsToQuiz(assignStudentsToQuizInput: AssignStudentsToQuizInput):Promise<Quiz> {
//   const {quizId, studentIds} = assignStudentsToQuizInput;
  
//   const quiz = await this.quizRepository.findOne({id: quizId});
//   quiz.students = [...new Set([...quiz.students, ...studentIds])];
//   return this.quizRepository.save(quiz);
// }