import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { JwtPayload } from 'src/auth/types';
import { editFileName, imageFileFilter } from 'src/upload';
import { GetUser } from 'src/users/decorators';
import { confirmPasswordDto } from 'src/users/dtos/confirmPassword.dto';
import { Roles } from 'src/users/enum/roles.enum';
import { User } from 'src/users/models/user.model';
import {
  AddTeacherDto,
  AddUserDto,
  CreateCourseDto,
  UpdateCourseDto,
} from '../dtos';
import { Status } from '../enum';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { Response } from '../types';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  //!   *******************************************
  //!  COURSES CRUD
  //!   *******************************************

  //***** Create course *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create course' })
  @HttpCode(HttpStatus.CREATED)
  @Put('create')
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCourseDto);
  }

  //***** Get all courses *****//
  // @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all courses' })
  @Get('all')
  async getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  //***** Get course by id *****//

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get course by id' })
  @Get('id/:id')
  async getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  //***** Get course by status *****//
  @ApiOperation({ summary: 'Get course by status' })
  @Get('status/:status')
  async getCourseByStatus(@Param('status') status: Status) {
    return this.coursesService.getCourseByStatus(status);
  }

  //***** Get courses by actual user *****//
  @ApiOperation({ summary: 'Get courses by actual user' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('me')
  async getCourseByActualUser(@GetUser('sub') id: string): Promise<Course[]> {
    return this.coursesService.getCoursesByActualUser(id);
  }

  //***** Update course *****//
  //! Only admin and teacher
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update course',
    description: 'Only admin and teacher',
  })
  @Put('update/:id')
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  //***** Delete course *****//
  //! Only admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete course' })
  @Delete('delete/:id')
  async deleteCourse(
    @Param('id') id: string,
    @GetUser() user: JwtPayload,
    @Body() confirmPassword: confirmPasswordDto,
  ): Promise<Response> {
    return this.coursesService.deleteCourse(
      user.sub,
      id,
      confirmPassword.password,
    );
  }

  //***** Featured courses *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Featured courses ' })
  @Put('featured/:id')
  async setFeatured(@Param('id') id: string): Promise<Response> {
    return this.coursesService.setFeatured(id);
  }

  //***** Upload course image *****//
  // @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload course image' })
  @Put('courseImage/upload/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/courses',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadCourseImage(@Param('id') id: string, @UploadedFile() file) {
    return await this.coursesService.uploadCourseImage(file, id);
  }

  //***** Get course image *****//

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get course image' })
  @Get('courseImage/:imgpath')
  async getCourseImage(@Param('imgpath') imgpath: string, @Res() res) {
    return this.coursesService.getCourseImage(imgpath, res);
  }

  //!   *******************************************
  //!  MANAGE TEACHERS IN COURSES
  //!   *******************************************

  //***** Get teachers by course *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get teachers by course' })
  @Get('teachers/:id')
  async getTeachersByCourseId(@Param('id') id: string): Promise<User[]> {
    return this.coursesService.getTeachersByCourseId(id);
  }

  //***** Add teacher to a course *****//
  //! Only admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add teacher to a course',
    description: 'Only admin',
  })
  @Put('teacher/add')
  async addTeacherToCourse(
    @Body() addTeacherDto: AddTeacherDto,
  ): Promise<Response> {
    return this.coursesService.addTeacherToCourse(addTeacherDto);
  }

  //***** Remove teacher from a course *****//
  //! Only admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove teacher', description: 'Only admin' })
  @Delete('teacher/remove')
  async removeTeacherFromCourse(
    @Body() addTeacherDto: AddTeacherDto,
  ): Promise<Response> {
    return this.coursesService.removeTeacherFromCourse(addTeacherDto);
  }

  //!   *******************************************
  //!  MANAGE USERS IN COURSES
  //!   *******************************************

  //***** Get users by course *****//
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users by course' })
  @Get('users/:id')
  async getUsersByCourseId(@Param('id') id: string): Promise<User[]> {
    return this.coursesService.getUsersByCourseId(id);
  }

  //***** Add user to a course *****//
  //! Only Admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add user to a course', description: 'Only admin' })
  @Put('user/add')
  async addUserToCourse(@Body() addUserDto: AddUserDto): Promise<Response> {
    return this.coursesService.addUserToCourse(addUserDto);
  }

  //***** Remove user from a course *****//
  //! Only Admin
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove user from a course',
    description: 'Only admin',
  })
  @Delete('user/remove')
  async removeUserFromCourse(
    @Body() addUserDto: AddUserDto,
  ): Promise<Response> {
    return this.coursesService.removeUserFromCourse(addUserDto);
  }
}
