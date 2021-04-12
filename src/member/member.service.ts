import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {MemberEntity} from './member.entity';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { CreateMemberInputType } from './member.input-type';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity) private memberRepository: Repository<MemberEntity>
  ) {}

  // Query

  // 해당 idUser의 멤버가 없으면 그자리에서 생성
  async getMemberByIdUser(idUser:string): Promise<MemberEntity> {
    
    try {
      const result = await this.memberRepository.findOne({idUser});
    
      if (result){
        return result;
      }
      else {
        const member = this.memberRepository.create({
          id: uuid(),
          idUser,
          listRecordQuiz: [],
        });

        const result = await this.memberRepository.save(member, {});
        return result;
      }
    }
    catch (error){
      console.log(error);
      return;
    }
  }

  
  // Mutation
  async createMember(createMemberInputType: CreateMemberInputType): Promise<MemberEntity> {
    
    const { idUser } = createMemberInputType;

    const member = this.memberRepository.create({
      id: uuid(),
      idUser,
      listRecordQuiz: [],
    });
    
    try { 
      const result = await this.memberRepository.save(member, {});
      return result;
    }
    catch(error){

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