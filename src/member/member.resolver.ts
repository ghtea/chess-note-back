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
  GetMemberByUserInputType,
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
  async getMemberByUser(
    @Args('getMemberByUserInputType')
    getMemberByUserInputType: GetMemberByUserInputType,
  ) {
    const { userId, userName } = getMemberByUserInputType;
    const member = await this.memberService.getMemberByUser({
      userId,
      userName,
    });

    if (member) {
      return this.memberService.getMemberByUser({ userId, userName });
    } else {
      return this.memberService.createMember({ userId, userName });
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
    const { userId, userName } = updateMemberInputType;
    const member = await this.memberService.getMemberByUser({
      userId,
      userName,
    });

    if (member) {
      return this.memberService.updateMember(updateMemberInputType);
    } else {
      return this.memberService.createMember({ userId, userName });
    }
  }
}

// @ResolveField()
//   // 해당 filed 요청할 때마다 이 함수 실행
//   async students(@Parent() quiz: QuizEntity){
//     return this.studentService.getManyStudents(quiz.students);
//   }
