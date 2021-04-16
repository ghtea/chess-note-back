import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {QuizEntity} from './quiz.entity';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { CreateQuizInputType, GetListQuizInputType, GetQuizByIdInputType, KindGetListQuiz } from './quiz.input-type';
import _getListQuiz from './quiz.service/_getListQuiz';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>
  ) {}

  // Query
  async getQuizById(getQuizByIdInputType:GetQuizByIdInputType): Promise<QuizEntity> {
    const {id, idUser} = getQuizByIdInputType;

    const result = await this.quizRepository.findOne({id});
    
    if (result.isPublic){
      return result;
    }
    else if (result.idUser === idUser){
      return result;
    }
    else {

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This quiz is not public and the user is not owner of this quiz',
      }, HttpStatus.FORBIDDEN);
      
    }
  }


  async getListQuiz(getListQuizInputType:GetListQuizInputType): Promise<QuizEntity[]> {

    return _getListQuiz(getListQuizInputType, this.quizRepository);
    
  }

  



  
  // Mutation
  async createQuiz(createQuizInputType: CreateQuizInputType): Promise<QuizEntity> {
    
    const {name, side, fenStart, listListMoveCorrect, idUser, isPublic} = createQuizInputType;

    const quiz = this.quizRepository.create({
      id: uuid(),
      name,
      side,
      fenStart, 
      listListMoveCorrect,
      idUser,
      isPublic,
      dateCreated: Date.now(),
    });
    
    try { 
      const result = await this.quizRepository.save(quiz, {});
      return result;
    }
    catch(error){

      console.log(error);
      return;
    }
  }


}



// async assignStudentsToQuiz(assignStudentsToQuizInput: AssignStudentsToQuizInput):Promise<Quiz> {
//   const {quizId, studentIds} = assignStudentsToQuizInput;
  
//   const quiz = await this.quizRepository.findOne({id: quizId});
//   quiz.students = [...new Set([...quiz.students, ...studentIds])];
//   return this.quizRepository.save(quiz);
// }