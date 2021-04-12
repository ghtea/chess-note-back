import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {QuizEntity} from './quiz.entity';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { CreateQuizInputType, GetListQuizInputType, KindGetQuizRandom } from './quiz.input-type';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>
  ) {}

  // Query
  async getListQuiz(getListQuizInputType: GetListQuizInputType): Promise<QuizEntity[]> {
    const {
      idUser
    } = getListQuizInputType
    return this.quizRepository.find({idUser});
  }

  async getListQuizPublic(): Promise<QuizEntity[]> {
    
    return this.quizRepository.find({ isPublic: true });
  }

  async getQuizById(id:string): Promise<QuizEntity> {
    return this.quizRepository.findOne({id});
  }



  async getQuizRandom(kind: KindGetQuizRandom, listRecordQuizOfUser?, idUser?): Promise<QuizEntity[]> {
    if (kind === KindGetQuizRandom.myQuizByRecord){
      
    }
    else if (kind === KindGetQuizRandom.publicQuizByRecord){
      
    }
    else { // kind === KindGetQuizRandom.publicQuiz

    }
    return this.quizRepository.find({idUser});
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