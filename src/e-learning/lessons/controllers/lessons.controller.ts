import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { editFileName } from 'src/upload';
import { videoFileFilter } from 'src/upload/videoFilter';
import { Roles } from 'src/users/enum/roles.enum';
import { CreateLessonDto } from '../dtos';
import { UpdateLessonDto } from '../dtos/updateLesson.dto';
import { LessonsService } from '../services/lessons.service';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}

  //***** Create a lesson *****//

  @Get('getFirstLessonByCourseId/:courseId')
  // @UseGuards(JwtGuard)
  async getFirstLessonByCourseId(@Param('courseId') courseId: string) {
    console.log('Getting first lesson by courseId: ' + courseId);
    return await this.lessonService.getFirstLessonByCourseId(courseId); //
  }

  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiOperation({ summary: 'Get All Video' })
  @ApiBearerAuth()
  @Get('getAllVideos')
  async getAllVideos() {
    return await this.lessonService.getAllVideos();
  }

  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Create a lesson' })
  @ApiBearerAuth()
  @Put('/create/:sectionId')
  async createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @Param('sectionId') sectionId: string,
  ) {
    return await this.lessonService.createLesson(createLessonDto, sectionId);
  }

  //***** Find lesson by section *****//
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get lessons by section ' })
  @Get('/:sectionId')
  async findLessonBySection(@Param('sectionId') sectionId: string) {
    return await this.lessonService.getLessonBySection(sectionId);
  }

  //***** Find lesson by id *****//
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get lesson by id' })
  @Get('me/:lessonId/')
  async getLesson(@Param('lessonId') lessonId: string) {
    return await this.lessonService.getLessonById(lessonId);
  }

  //***** Update lesson *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Update lesson' })
  @ApiBearerAuth()
  @Put('update/:lessonId')
  async updateLesson(
    @Param('lessonId') lessonId: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return await this.lessonService.updateLesson(lessonId, updateLessonDto);
  }

  //***** Delete lesson by id *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiBearerAuth()
  @Delete('/delete/:lessonId')
  async deleteLesson(@Param('lessonId') lessonId: string) {
    return await this.lessonService.deleteLesson(lessonId);
  }
  //Delete Video by id
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiBearerAuth()
  @Delete('/deleteVideo/:videoId')
  async deleteVideo(@Param('videoId') videoId: string) {
    return await this.lessonService.deleteVideo(videoId);
  }

  //! Upload files !//

  //***** Upload video *****//
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload video' })
  @Put('/upload/video/:lessonId')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './files/lessons',
        filename: editFileName,
      }),
      fileFilter: videoFileFilter,
    }),
  )
  async uploadVideo(
    @UploadedFile() video: Express.Multer.File,
    @Param('lessonId') lessonId: string,
  ) {
    return await this.lessonService.uploadVideo(lessonId, video);
  }

  //***** Get video by lesson *****//
  // @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get video by lesson' })
  @Get('/video/:lessonId')
  async getVideoByLesson(@Param('lessonId') lessonId: string) {
    return await this.lessonService.getVideoByLesson(lessonId);
  }

  //Upload Resources
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN, Roles.TEACHER))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload video' })
  @Put('/upload/resource/:lessonId')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadResources(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('lessonId') lessonId: string,
  ) {
    return await this.lessonService.uploadResources(lessonId, files);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get resource by section ' })
  @Get('/resource/:sectionId')
  async findResourceBySection(@Param('sectionId') sectionId: string) {
    return await this.lessonService.getResourceBySectionId(sectionId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get resource by id' })
  @Get('/resourceById/:resourceId')
  async getResourceById(@Param('resourceId') resourceId: string) {
    return await this.lessonService.getResourceById(resourceId);
  }
}
