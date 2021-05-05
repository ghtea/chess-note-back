import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
//import { stringify } from "node:querystring";
import { MemberService } from "src/member/member.service";
import { QuizEntity } from "./quiz.entity";
import { GetListQuizInputType, CreateQuizInputType, GetFocusListQuizInputType, GetQuizByIdInputType, KindGetFocusListQuiz, UpdateQuizInputType, GetDictListQuizInputType } from "./quiz.input-type";
import { QuizService } from "./quiz.service";
import { DictListQuizType, QuizType } from "./quiz.type";


@Resolver(of => QuizType)
export class QuizResolver {
  
  constructor(
    private quizService: QuizService,
    private memberService: MemberService,
  ){}
  

  // Query 
  @Query(returns => [QuizType])
  getListQuiz(
    @Args('getListQuizInputType') getListQuizInputType:GetListQuizInputType,
  ) {
    return this.quizService.getListQuiz(getListQuizInputType);
  }

  @Query(returns => QuizType)
  getQuizById(
    @Args('getQuizByIdInputType') getQuizByIdInputType:GetQuizByIdInputType,
  ) {
    return this.quizService.getQuizById(getQuizByIdInputType);
  }

  @Query(returns => DictListQuizType)
  async getDictListQuiz(
    @Args('getDictListQuizInputType') getDictListQuizInputType:GetDictListQuizInputType,
  ) {
    const {idUser} = getDictListQuizInputType;

    const listPublicQuiz = await this.quizService.getListQuiz({});
    const listMyQuiz = await this.quizService.getListQuiz({idUser});

    return ({
      listPublicQuiz: listPublicQuiz || [],
      listMyQuiz: listMyQuiz || [],
    });
  }



  @Query(returns => [QuizType])
  async getFocusListQuiz(
    @Args('getFocusListQuizInputType') getFocusListQuizInputType:GetFocusListQuizInputType,
  ) {
    const {kind, idUser} = getFocusListQuizInputType;
    // 3가지 경우
    // 1. 로그인 없이, 모든 퀴즈     'public-quiz' 
    // 2. 로그인 한채로, 모든 퀴즈 (자신의 퀴즈 푼 이력 이용)     'public-quiz-by-record'
    // 3. 로그인 한채로, 내 퀴즈만 (자신의 퀴즈 푼 이력 이용)     'my-quiz-by-record'

    if (kind === KindGetFocusListQuiz.myQuizByRecord){
      const member = await this.memberService.getMemberByIdUser(idUser);
      const listRecordQuizOfUser = member.listRecordQuiz;
      return this.quizService.getFocusListQuiz({kind, listRecordQuizOfUser, idUser});
    }
    else if (kind === KindGetFocusListQuiz.publicQuizByRecord){
      const member = await this.memberService.getMemberByIdUser(idUser);
      const listRecordQuizOfUser = member.listRecordQuiz;
      return this.quizService.getFocusListQuiz({kind, listRecordQuizOfUser});
    }
    else { // kind === 
      return this.quizService.getFocusListQuiz({kind});
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

  updateQuiz(
    @Args('updateQuizInputType') updateQuizInputType:UpdateQuizInputType,
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