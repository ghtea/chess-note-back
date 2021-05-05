import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { stringify } from "node:querystring";
import { OpeningEntity } from "./opening.entity";
import { CreateOpeningInputType, GetListOpeningInputType } from "./opening.input-type";
import { OpeningService } from "./opening.service";
import { OpeningType } from "./opening.type";


@Resolver(of => OpeningType)
export class OpeningResolver {
  
  constructor(
    private openingService: OpeningService,
    //private studentService: StudentService,
  ){}
  

  // Query 
  @Query(returns => [OpeningType]) // graphQL 문법 주의!
  getListOpening(
    @Args('getListOpeningInputType') getListOpeningInputType:GetListOpeningInputType,
  ){
    return this.openingService.getListOpening(getListOpeningInputType);

  }


  
  @Query(returns => OpeningType)
  getOpeningById(
    @Args('id') id:string,
  ) {
    return this.openingService.getOpeningById(id);
  }



  // Mutation
  @Mutation(returns => OpeningType)
  createOpening(
    @Args('createOpeningInputType') createOpeningInputType:CreateOpeningInputType,
  ) {
    return this.openingService.createOpening(createOpeningInputType);
  }


}



// @ResolveField()
//   // 해당 filed 요청할 때마다 이 함수 실행
//   async students(@Parent() opening: OpeningEntity){
//     return this.studentService.getManyStudents(opening.students);
//   }