import { ForbiddenException, Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import fs from 'fs';
import { Roles } from 'src/users/enum/roles.enum';
import { User } from 'src/users/models/user.model';
import { UsersRepository } from 'src/users/repositories/user.repository';
import {
  AddTeacherDto,
  AddUserDto,
  CreateCourseDto,
  UpdateCourseDto,
} from '../dtos';
import { Status } from '../enum';
import { Course } from '../models/course.model';
import { CoursesRepository } from '../repositories/courses.repository';
import { Response } from '../types';

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  //!   *******************************************
  //!  COURSES CRUD
  //!   *******************************************

  //***** Create course *****//
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const courseEntity = await this.courseRepository.create(createCourseDto);
      const course = await this.courseRepository.save(courseEntity);
      return course;
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('El curso ya existe');
      }
      throw new ForbiddenException(error.message);
    }
  }

  //***** Get all courses *****//

  async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseRepository.find();
    if (courses.length === 0) {
      throw new ForbiddenException('No hay cursos');
    }
    return courses;
  }

  //***** Get course by id *****//

  async getCourseById(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne(id);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    return course;
  }

  //***** Get course by status *****//

  async getCourseByStatus(status: Status): Promise<Course[]> {
    const courses = await this.courseRepository.findByStatus(status);
    if (courses.length === 0) {
      throw new ForbiddenException('No hay cursos');
    }
    return courses;
  }

  //***** Get number of users per course *****//
  async getNumberOfUsersByCourseId(id: string): Promise<number> {
    const students = await this.getUsersByCourseId(id);
    if (students.length === 0) {
      throw new ForbiddenException('No hay estudiantes');
    }
    return students.length;
  }

  //*****  Get courses by actual user *****//
  async getCoursesByActualUser(userId: string): Promise<Course[]> {
    try {
      const user = await this.userRepository.findOne(userId);
      if (!user) {
        throw new ForbiddenException('El usuario no existe');
      }
      const courses = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.users', 'user')
        .where('user.id = :userId', { userId })
        .getMany();
      const filterCourses = courses.map((course) => {
        delete course.users;
        return course;
      });

      return filterCourses;
    } catch (error) {}
  }

  //***** Update course *****//
  //! Only Admin and Teacher
  async updateCourse(
    courseId: string,
    course: UpdateCourseDto,
  ): Promise<Course> {
    const updatedCourse = await this.courseRepository.updateCourse(
      courseId,
      course,
    );
    if (!updatedCourse) {
      throw new ForbiddenException('El curso no existe');
    }
    return updatedCourse;
  }

  //***** Delete course *****//
  //! Only Admin
  async deleteCourse(
    id: string,
    courseId: string,
    confirmPassword: string,
  ): Promise<Response> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new ForbiddenException(
        'Ocurrio un error al eliminar el curso, intente de nuevo',
      );
    }
    const pwMatch = await verify(user.password, confirmPassword);
    if (!pwMatch) {
      throw new ForbiddenException('Contraseña incorrecta, intente de nuevo');
    }
    return await this.courseRepository.deleteCourse(courseId);
  }

  //***** Feature a course ******//
  //! Only Admin
  async setFeatured(courseId: string): Promise<Response> {
    const course = await this.courseRepository.findOne(courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    return this.courseRepository.setFeatured(courseId);
  }

  //***** Upload course image *****//
  async uploadCourseImage(
    courseImage: any,
    courseId: string,
  ): Promise<Response> {
    if (!courseImage) {
      throw new ForbiddenException('Tienes que subir una imagen');
    }
    const course = await this.courseRepository.findOne(courseId);
    if (course.image) {
      try {
        fs.unlinkSync(`./files/courses/${course.image}`);
      } catch (error) {
        console.log(error);
      }
    }
    return this.courseRepository.uploadCourseImage(courseImage, courseId);
  }

  //***** Get course image *****//
  async getCourseImage(image: string, res) {
    try {
      if (!fs.existsSync(`./files/courses/${image}`)) {
        throw new ForbiddenException('El curso no tiene imagen');
      }
      const img = res.sendFile(image, { root: './files/courses' });
      return img;
    } catch (error) {
      console.log(error);
    }
  }

  //!   *******************************************
  //!  MANAGE TEACHERS IN COURSES
  //!   *******************************************

  //***** Get teachers by course *****//
  async getTeachersByCourseId(id: string): Promise<User[]> {
    const course = await this.courseRepository.findOne(id);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const teachers = await this.courseRepository.getTeachersByCourseId(id);
    if (teachers.length === 0) {
      throw new ForbiddenException('No hay profesores');
    }
    teachers.map((teacher: User) => {
      delete teacher.password;
      delete teacher.refreshToken;
    });
    return teachers;
  }

  //***** Add teacher to a course *****//
  //! Only Admin
  async addTeacherToCourse(addTeacherDto: AddTeacherDto): Promise<Response> {
    const course = await this.courseRepository.findOne(addTeacherDto.courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const teacher = await this.userRepository.findOne(addTeacherDto.teacherId);
    if (!teacher) {
      throw new ForbiddenException('El profesor no existe');
    }
    if (teacher.role !== Roles.TEACHER) {
      throw new ForbiddenException('El usuario no es profesor');
    }
    return this.courseRepository.addTeacherToCourse(addTeacherDto);
  }

  //*****Remove teacher from a course *****//
  //! Only Admin
  async removeTeacherFromCourse(
    addTeacherDto: AddTeacherDto,
  ): Promise<Response> {
    const course = await this.courseRepository.findOne(addTeacherDto.courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const teacher = await this.courseRepository.getTeacherByCourseId(
      addTeacherDto.courseId,
      addTeacherDto.teacherId,
    );
    if (!teacher) {
      throw new ForbiddenException(
        'El profesor no esta registrado en el curso',
      );
    }

    return await this.courseRepository.removeTeacherFromCourse(addTeacherDto);
  }

  //!   *******************************************
  //!  MANAGE USERS IN COURSES
  //!   *******************************************

  //***** Get users by course *****//
  async getUsersByCourseId(id: string): Promise<User[]> {
    const course = await this.courseRepository.findOne(id);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const users = await this.courseRepository.getUsersByCourseId(id);
    if (users.length === 0) {
      throw new ForbiddenException('No hay alumnos en el curso');
    }
    users.map((user) => {
      delete user.password;
      delete user.refreshToken;
    });
    return users;
  }

  //***** Add user to a course *****//
  //! Only Admin
  async addUserToCourse(addUserDto: AddUserDto): Promise<Response> {
    const course = await this.courseRepository.findOne(addUserDto.courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const user = await this.userRepository.findOne(addUserDto.userId);
    if (!user) {
      throw new ForbiddenException('El usuario no existe');
    }
    return this.courseRepository.addUserToCourse(addUserDto);
  }

  //*****Remove user from a course *****//
  //! Only Admin
  async removeUserFromCourse(addUserDto: AddUserDto): Promise<Response> {
    const course = await this.courseRepository.findOne(addUserDto.courseId);
    if (!course) {
      throw new ForbiddenException('El curso no existe');
    }
    const user = await this.courseRepository.getUserByCourseId(
      addUserDto.courseId,
      addUserDto.userId,
    );
    if (!user) {
      throw new ForbiddenException('El usuario no esta registrado en el curso');
    }
    return await this.courseRepository.removeUserFromCourse(addUserDto);
  }
}
