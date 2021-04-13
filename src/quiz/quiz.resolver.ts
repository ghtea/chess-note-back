import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
//import { stringify } from "node:querystring";
import { MemberService } from "src/member/member.service";
import { QuizEntity } from "./quiz.entity";
import { CreateQuizInputType, GetListQuizInputType, KindGetListQuiz } from "./quiz.input-type";
import { QuizService } from "./quiz.service";
import { QuizType } from "./quiz.type";


@Resolver(of => QuizType)
export class QuizResolver {
  
  constructor(
    private quizService: QuizService,
    private memberService: MemberService,
  ){}
  

  // Query 
  @Query(returns => QuizType)
  getQuizById(
    @Args('id') id:string,
  ) {
    return this.quizService.getQuizById(id);
  }



  @Query(returns => [QuizType])
  async getListQuiz(
    @Args('getListQuizInputType') getListQuizInputType:GetListQuizInputType,
  ) {
    const {kind, idUser} = getListQuizInputType;
    // 3가지 경우
    // 1. 로그인 없이, 모든 퀴즈     'public-quiz' 
    // 2. 로그인 한채로, 모든 퀴즈 (자신의 퀴즈 푼 이력 이용)     'public-quiz-by-record'
    // 3. 로그인 한채로, 내 퀴즈만 (자신의 퀴즈 푼 이력 이용)     'my-quiz-by-record'

    if (kind === KindGetListQuiz.myQuizByRecord){
      const result = await this.memberService.getMemberByIdUser(idUser);
      const listRecordQuizOfUser = result.listRecordQuiz;
      return this.quizService.getListQuiz({kind, listRecordQuizOfUser, idUser});
    }
    else if (kind === KindGetListQuiz.publicQuizByRecord){
      const result = await this.memberService.getMemberByIdUser(idUser);
      const listRecordQuizOfUser = result.listRecordQuiz;
      return this.quizService.getListQuiz({kind, listRecordQuizOfUser});
    }
    else { // kind === 
      return this.quizService.getListQuiz({kind});
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