import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { stringify } from "node:querystring";
import { CreateStudentInput } from "./student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";


@Resolver( of => StudentType)
export class StudentResolver {
  constructor(
    private studentService: StudentService
  ){}

  @Query(returns => StudentType)
  student(
    @Args('id') id:string,
  ) {
    return this.studentService.getStudent(id);
  }

  @Query(returns => [StudentType]) // graphQL 문법 주의!
  students(){
    return this.studentService.getStudents();
  }



  @Mutation(returns => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput:CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}