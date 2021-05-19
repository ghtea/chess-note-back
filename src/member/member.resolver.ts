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
import {
  CreateMemberInputType,
  GetMemberByUserIdInputType,
  UpdateMemberInputType,
} from './member.input-type';
import { MemberService } from './member.service';
import { MemberType } from './member.type';

@Resolver((of) => MemberType)
export class MemberResolver {
  constructor(
    private memberService: MemberService, //private studentService: StudentService,
  ) {}

  @Query((returns) => MemberType)
  async getMemberByUserId(
    @Args('getMemberByUserIdInputType')
    getMemberByUserIdInputType: GetMemberByUserIdInputType,
  ) {
    const { userId } = getMemberByUserIdInputType;
    const member = await this.memberService.getMemberByUserId(userId);

    if (member) {
      return this.memberService.getMemberByUserId(userId);
    } else {
      return this.memberService.createMember({ userId });
    }
  }

  // Mutation
  @Mutation((returns) => MemberType)
  createMember(
    @Args('createMemberInputType') createMemberInputType: CreateMemberInputType,
  ) {
    //console.log('hello')
    return this.memberService.createMember(createMemberInputType);
  }

  @Mutation((returns) => MemberType)
  async updateMember(
    @Args('updateMemberInputType') updateMemberInputType: UpdateMemberInputType,
  ) {
    const { userId } = updateMemberInputType;
    const member = await this.memberService.getMemberByUserId(userId);

    if (member) {
      return this.memberService.updateMember(updateMemberInputType);
    } else {
      return this.memberService.createMember({ userId });
    }
  }
}

// @ResolveField()
//   // 해당 filed 요청할 때마다 이 함수 실행
//   async students(@Parent() quiz: QuizEntity){
//     return this.studentService.getManyStudents(quiz.students);
//   }
