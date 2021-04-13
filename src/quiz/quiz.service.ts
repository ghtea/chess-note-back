import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {QuizEntity} from './quiz.entity';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { CreateQuizInputType, GetListQuizInputType, KindGetListQuiz } from './quiz.input-type';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>
  ) {}

  // Query
  async getQuizById(id:string): Promise<QuizEntity> {
    return this.quizRepository.findOne({id});
  }


  async getListQuiz(getListQuizInputType:GetListQuizInputType): Promise<QuizEntity[]> {
    const {
      kind, idUser, listRecordQuizOfUser,
    } = getListQuizInputType;

    if (kind === KindGetListQuiz.myQuizByRecord){

      const result = await this.quizRepository.find({ idUser });
      console.log(result);
      console.log('1')
      return result;
    }
    else if (kind === KindGetListQuiz.publicQuizByRecord){
      const result = await this.quizRepository.find({ isPublic: true });
      console.log(result);
      console.log('2')
      return result;
    }
    else { // kind === KindGetListQuiz.publicQuiz
      const result = await this.quizRepository.find({ isPublic: true });
      console.log(result);
      console.log('3')
      return result;
    }
    
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