import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {QuizEntity} from './quiz.entity';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { CreateQuizInputType, GetFocusListQuizInputType, GetListQuizInputType, GetQuizByIdInputType, KindGetFocusListQuiz, UpdateQuizInputType } from './quiz.input-type';
import _getFocusListQuiz from './quiz.service/_getFocusListQuiz';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>
  ) {}

  // Query
  async getListQuiz(getListQuizInputType:GetListQuizInputType): Promise<QuizEntity[]> {
    const {idUser} = getListQuizInputType;
    let result: QuizEntity[] = []
    if (idUser){
      result = await this.quizRepository.find({ idUser });
    }
    else {
      result = await this.quizRepository.find({ isPublic: true });
    }
    
    return result;
  }



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


  async getFocusListQuiz(getFocusListQuizInputType:GetFocusListQuizInputType): Promise<QuizEntity[]> {

    return _getFocusListQuiz(getFocusListQuizInputType, this.quizRepository);
    
  }

  



  
  // Mutation
  async createQuiz(createQuizInputType: CreateQuizInputType): Promise<QuizEntity> {
    
    const {name, turnNext, fenStart, listSeriesSanCorrect, listSeriesSanMention, idUser, isPublic} = createQuizInputType;

    const quiz = this.quizRepository.create({
      id: uuid(),
      name,
      turnNext,
      fenStart, 
      listSeriesSanCorrect,
      listSeriesSanMention,
      idUser,
      isPublic,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
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



  async updateQuiz(updateQuizInputType: UpdateQuizInputType): Promise<QuizEntity> {
    
    const {id, name, turnNext, fenStart, listSeriesSanCorrect, listSeriesSanMention, isPublic} = updateQuizInputType;

    
    try { 
      let quizToUpdate = await this.quizRepository.findOne(id);

      if (quizToUpdate){
        const result = await this.quizRepository.save({
          ...quizToUpdate, 
          ...updateQuizInputType,
          dateUpdated: Date.now(),
        });
        return result;
      }
      else {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'There is no quiz with that id',
        }, HttpStatus.NOT_FOUND);
      }

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