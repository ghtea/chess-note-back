import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { stringify } from "node:querystring";
import { StudentService } from "src/student/student.service";
import { OpeningEntity } from "./opening.entity";
import { CreateOpeningInputType } from "./opening.input-type";
import { OpeningService } from "./opening.service";
import { OpeningType } from "./opening.type";


@Resolver(of => OpeningType)
export class OpeningResolver {
  
  constructor(
    private openingService: OpeningService,
    private studentService: StudentService,
  ){}

  @Query(returns => OpeningType)
  opening(
    @Args('id') id:string,
  ) {
    return this.openingService.getOpening(id);
  }

  @Query(returns => [OpeningType]) // graphQL 문법 주의!
  openings(){
    console.log('hello')
    return this.openingService.getOpenings();
  }



  @Mutation(returns => OpeningType)
  createOpening(
    @Args('createOpeningInput') createOpeningInput:CreateOpeningInputType,
  ) {
    return this.openingService.createOpening(createOpeningInput);
  }


}



// @ResolveField()
//   // 해당 filed 요청할 때마다 이 함수 실행
//   async students(@Parent() opening: OpeningEntity){
//     return this.studentService.getManyStudents(opening.students);
//   }