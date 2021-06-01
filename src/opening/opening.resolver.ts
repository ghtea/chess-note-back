import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { stringify } from 'node:querystring';
import { OpeningEntity } from './opening.entity';
import {
  CreateOpeningInputType,
  DeleteOpeningInputType,
  GetOpeningByIdInputType,
  GetOpeningListInputType,
  LikeDislikeOpeningInputType,
  UpdateOpeningInputType,
} from './opening.input-type';
import { MemberService } from 'src/member/member.service';
import { OpeningService } from './opening.service';
import { OpeningType } from './opening.type';

@Resolver((of) => OpeningType)
export class OpeningResolver {
  constructor(
    private openingService: OpeningService, //private studentService: StudentService,
    private memberService: MemberService, // private memberRepository: Repository<MemberEntity>, this is not possible
  ) {}

  // Query
  @Query((returns) => [OpeningType])
  getOpeningList(
    @Args('getOpeningListInput') getOpeningListInput: GetOpeningListInputType,
  ) {
    return this.openingService.getOpeningList(getOpeningListInput);
  }

  @Query((returns) => OpeningType)
  getOpeningById(
    @Args('getOpeningByIdInput') getOpeningByIdInput: GetOpeningByIdInputType,
  ) {
    return this.openingService.getOpeningById(getOpeningByIdInput);
  }

  // Mutation
  @Mutation((returns) => OpeningType)
  createOpening(
    @Args('createOpeningInput') createOpeningInput: CreateOpeningInputType,
  ) {
    //console.log('hello')
    return this.openingService.createOpening(createOpeningInput);
  }

  @Mutation((returns) => OpeningType)
  updateOpening(
    @Args('updateOpeningInput') updateOpeningInput: UpdateOpeningInputType,
  ) {
    //console.log('hello')
    return this.openingService.updateOpening(updateOpeningInput);
  }

  @Mutation(() => Boolean)
  deleteOpening(
    @Args('deleteOpeningInput') deleteOpeningInput: DeleteOpeningInputType,
  ) {
    return this.openingService.deleteOpening(deleteOpeningInput);
  }

  @Mutation((returns) => OpeningType)
  likeDislikeOpening(
    @Args('likeDislikeOpeningInput')
    likeDislikeOpeningInput: LikeDislikeOpeningInputType,
  ) {
    return this.openingService.likeDislikeOpening(likeDislikeOpeningInput);
  }

  // Resolver
  @ResolveField()
  async authorName(@Parent() opening: OpeningEntity) {
    return (await this.memberService.getMemberByUserId(opening.authorId))
      .userName;
  }
}
