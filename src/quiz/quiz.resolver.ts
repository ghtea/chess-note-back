import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
//import { stringify } from "node:querystring";
import { MemberService } from 'src/member/member.service';
import { QuizEntity } from './quiz.entity';
import {
  getQuizListInputType,
  CreateQuizInputType,
  GetQuizByIdInputType,
  UpdateQuizInputType,
  GetQuizListDictInputType,
} from './quiz.input-type';
import { QuizService } from './quiz.service';
import { QuizListDictType, QuizType } from './quiz.type';

@Resolver((of) => QuizType)
export class QuizResolver {
  constructor(
    private quizService: QuizService,
    private memberService: MemberService,
  ) {}

  // Query
  @Query((returns) => [QuizType])
  getQuizList(
    @Args('getQuizListInputType') getQuizListInputType: getQuizListInputType,
  ) {
    return this.quizService.getQuizList(getQuizListInputType);
  }

  @Query((returns) => QuizType)
  getQuizById(
    @Args('getQuizByIdInputType') getQuizByIdInputType: GetQuizByIdInputType,
  ) {
    return this.quizService.getQuizById(getQuizByIdInputType);
  }

  @Query((returns) => QuizListDictType)
  async getQuizListDict(
    @Args('getQuizListDictInputType')
    getQuizListDictInputType: GetQuizListDictInputType,
  ) {
    const { userId } = getQuizListDictInputType;

    const publicQuizList = await this.quizService.getQuizList({});
    const myQuizList = await this.quizService.getQuizList({ userId });

    return {
      publicQuizList: publicQuizList || [],
      myQuizList: myQuizList || [],
    };
  }

  // Mutation
  @Mutation((returns) => QuizType)
  createQuiz(
    @Args('createQuizInputType') createQuizInputType: CreateQuizInputType,
  ) {
    //console.log('hello')
    return this.quizService.createQuiz(createQuizInputType);
  }

  @Mutation((returns) => QuizType)
  updateQuiz(
    @Args('updateQuizInputType') updateQuizInputType: UpdateQuizInputType,
  ) {
    //console.log('hello')
    return this.quizService.updateQuiz(updateQuizInputType);
  }
}

// @ResolveField()
//   // 해당 filed 요청할 때마다 이 함수 실행
//   async students(@Parent() quiz: QuizEntity){
//     return this.studentService.getManyStudents(quiz.students);
//   }
