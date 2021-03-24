import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { stringify } from "node:querystring";
import { StudentService } from "src/student/student.service";
import { QuizEntity } from "./quiz.entity";
import { CreateQuizInputType } from "./quiz.input-type";
import { QuizService } from "./quiz.service";
import { QuizType } from "./quiz.type";


@Resolver(of => QuizType)
export class QuizResolver {
  
  constructor(
    private quizService: QuizService,
    //private studentService: StudentService,
  ){}
  

  // Query 
  @Query(returns => [QuizType]) // graphQL 문법 주의!
  getListQuiz(){
    console.log('hello')
    return this.quizService.getListQuiz();
  }

  @Query(returns => QuizType)
  getQuizById(
    @Args('id') id:string,
  ) {
    return this.quizService.getQuizById(id);
  }



  // Mutation
  @Mutation(returns => QuizType)
  createQuiz(
    @Args('createQuizInputType') createQuizInputType:CreateQuizInputType,
  ) {
    return this.quizService.createQuiz(createQuizInputType);
  }


}



// @ResolveField()
//   // 해당 filed 요청할 때마다 이 함수 실행
//   async students(@Parent() quiz: QuizEntity){
//     return this.studentService.getManyStudents(quiz.students);
//   }