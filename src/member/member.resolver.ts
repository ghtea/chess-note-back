import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { stringify } from 'node:querystring';
import { MemberEntity } from './member.entity';
import { CreateMemberInputType } from './member.input-type';
import { MemberService } from './member.service';
import { MemberType } from './member.type';

@Resolver((of) => MemberType)
export class MemberResolver {
  constructor(
    private memberService: MemberService, //private studentService: StudentService,
  ) {}

  @Query((returns) => MemberType)
  getMemberByuserId(@Args('id') userId: string) {
    return this.memberService.getMemberByuserId(userId);
  }

  // Mutation
  @Mutation((returns) => MemberType)
  createMember(
    @Args('createMemberInputType') createMemberInputType: CreateMemberInputType,
  ) {
    //console.log('hello')
    return this.memberService.createMember(createMemberInputType);
  }
}

// @ResolveField()
//   // 해당 filed 요청할 때마다 이 함수 실행
//   async students(@Parent() quiz: QuizEntity){
//     return this.studentService.getManyStudents(quiz.students);
//   }
