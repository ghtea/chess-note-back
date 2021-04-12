import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { stringify } from "node:querystring";
import { MemberService } from "src/member/member.service";
import { QuizEntity } from "./quiz.entity";
import { CreateQuizInputType, GetListQuizInputType, GetQuizRandomInputType } from "./quiz.input-type";
import { QuizService } from "./quiz.service";
import { QuizType } from "./quiz.type";


@Resolver(of => QuizType)
export class QuizResolver {
  
  constructor(
    private quizService: QuizService,
    private memberService: MemberService,
  ){}
  

  // Query 
  @Query(returns => [QuizType]) // graphQL 문법 주의!
  getListQuiz(
    @Args('getListQuizInputType') getListQuizInputType:GetListQuizInputType,
  ){
    return this.quizService.getListQuiz(getListQuizInputType);
  }

  @Query(returns => [QuizType]) // graphQL 문법 주의!
  getListQuizPublic(
    
  ){
    return this.quizService.getListQuizPublic();
  }

  @Query(returns => QuizType)
  getQuizById(
    @Args('id') id:string,
  ) {
    return this.quizService.getQuizById(id);
  }



  @Query(returns => QuizType)
  async getQuizRandom(
    @Args('getQuizRandomInputType') getQuizRandomInputType:GetQuizRandomInputType,
  ) {
    const {kind, idUser} = getQuizRandomInputType;
    // 3가지 경우
    // 1. 로그인 없이, 모든 퀴즈     'public-quiz' 
    // 2. 로그인 한채로, 모든 퀴즈 (자신의 퀴즈 푼 이력 이용)     'public-quiz-by-record'
    // 3. 로그인 한채로, 내 퀴즈만 (자신의 퀴즈 푼 이력 이용)     'my-quiz-by-record'

    if (kind === 'my-quiz-by-record'){
      const listRecordQuizOfUser = await this.memberService.getMemberByIdUser(idUser);
      return this.quizService.getQuizRandom(kind, listRecordQuizOfUser, idUser);
    }
    else if (kind === 'public-quiz-by-record'){
      const listRecordQuizOfUser = await this.memberService.getMemberByIdUser(idUser);
      return this.quizService.getQuizRandom(kind, listRecordQuizOfUser);
    }
    else { // kind === '' public-quiz
      return this.quizService.getQuizRandom(kind);
    }
    
  }



  // Mutation
  @Mutation(returns => QuizType)
  createQuiz(
    @Args('createQuizInputType') createQuizInputType:CreateQuizInputType,
  ) {
    //console.log('hello')
    return this.quizService.createQuiz(createQuizInputType);
  }


}



// @ResolveField()
//   // 해당 filed 요청할 때마다 이 함수 실행
//   async students(@Parent() quiz: QuizEntity){
//     return this.studentService.getManyStudents(quiz.students);
//   }