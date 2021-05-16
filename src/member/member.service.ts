import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateMemberInputType } from './member.input-type';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {}

  // Query

  // 해당 userId의 멤버가 없으면 그자리에서 생성
  async getMemberByuserId(userId: string): Promise<MemberEntity> {
    try {
      const result = await this.memberRepository.findOne({ userId });

      if (result) {
        return result;
      } else {
        const member = this.memberRepository.create({
          id: uuid(),
          userId,
          quizRecordList: [],
        });

        const result = await this.memberRepository.save(member, {});
        return result;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Mutation
  async createMember(
    createMemberInputType: CreateMemberInputType,
  ): Promise<MemberEntity> {
    const { userId } = createMemberInputType;

    const member = this.memberRepository.create({
      id: uuid(),
      userId,
      quizRecordList: [],
    });

    try {
      const result = await this.memberRepository.save(member, {});
      return result;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

// async assignStudentsToMember(assignStudentsToMemberInput: AssignStudentsToMemberInput):Promise<Member> {
//   const {memberId, studentIds} = assignStudentsToMemberInput;

//   const member = await this.memberRepository.findOne({id: memberId});
//   member.students = [...new Set([...member.students, ...studentIds])];
//   return this.memberRepository.save(member);
// }
