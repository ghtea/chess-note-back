import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { stringify } from "node:querystring";
import { StudentService } from "src/student/student.service";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput, AssignStudentsToLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";


@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ){}

  @Query(returns => LessonType)
  lesson(
    @Args('id') id:string,
  ) {
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonType]) // graphQL 문법 주의!
  lessons(){
    console.log('hello')
    return this.lessonService.getLessons();
  }



  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput:CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(returns => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') assignStudentsToLessonInput:AssignStudentsToLessonInput,
  ) {
    return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput);
  }

  @ResolveField()
  // 해당 filed 요청할 때마다 이 함수 실행
  async students(@Parent() lesson: Lesson){
    return this.studentService.getManyStudents(lesson.students);
  }

}