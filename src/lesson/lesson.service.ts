import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Lesson} from './lesson.entity';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async getLesson(id:string): Promise<Lesson> {
    return this.lessonRepository.findOne({id});
  }

  
  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const {name, startDate, endDate, students} = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate, 
      endDate,
      students: students
    });

    return this.lessonRepository.save(lesson);
  }


  async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput):Promise<Lesson> {
    const {lessonId, studentIds} = assignStudentsToLessonInput;
    
    const lesson = await this.lessonRepository.findOne({id: lessonId});
    lesson.students = [...new Set([...lesson.students, ...studentIds])];
    return this.lessonRepository.save(lesson);
  }

}
