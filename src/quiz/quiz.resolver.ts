import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Root,
} from '@nestjs/graphql';
import { isNullableType } from 'graphql';
import { MemberEntity } from 'src/member/member.entity';
//import { stringify } from "node:querystring";
import { MemberService } from 'src/member/member.service';
import { Repository } from 'typeorm';
import { QuizEntity } from './quiz.entity';
import {
  GetQuizListInputType,
  CreateQuizInputType,
  GetQuizByIdInputType,
  UpdateQuizInputType,
  DeleteQuizInputType,
  LikeDislikeQuizInputType,
} from './quiz.input-type';
import { QuizService } from './quiz.service';
import { QuizType } from './quiz.type';

@Resolver((of) => QuizType)
export class QuizResolver {
  constructor(
    private quizService: QuizService,
    private memberService: MemberService, // private memberRepository: Repository<MemberEntity>, this is not possible
  ) {}

  // Query
  @Query((returns) => [QuizType])
  getQuizList(
    @Args('getQuizListInput') getQuizListInput: GetQuizListInputType,
  ) {
    return this.quizService.getQuizList(getQuizListInput);
  }

  @Query((returns) => QuizType)
  getQuizById(
    @Args('getQuizByIdInput') getQuizByIdInput: GetQuizByIdInputType,
  ) {
    return this.quizService.getQuizById(getQuizByIdInput);
  }

  // Mutation
  @Mutation((returns) => QuizType)
  createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInputType) {
    //console.log('hello')
    return this.quizService.createQuiz(createQuizInput);
  }

  @Mutation((returns) => QuizType)
  updateQuiz(@Args('updateQuizInput') updateQuizInput: UpdateQuizInputType) {
    //console.log('hello')
    return this.quizService.updateQuiz(updateQuizInput);
  }

  @Mutation(() => Boolean)
  deleteQuiz(@Args('deleteQuizInput') deleteQuizInput: DeleteQuizInputType) {
    return this.quizService.deleteQuiz(deleteQuizInput);
  }

  @Mutation((returns) => QuizType)
  likeDislikeQuiz(
    @Args('likeDislikeQuizInput')
    likeDislikeQuizInput: LikeDislikeQuizInputType,
  ) {
    return this.quizService.likeDislikeQuiz(likeDislikeQuizInput);
  }

  // Resolver
  @ResolveField()
  async authorName(@Parent() quiz: QuizEntity) {
    return (await this.memberService.getMemberByUserId(quiz.authorId)).userName;
  }
}
