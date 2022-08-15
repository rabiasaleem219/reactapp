import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { Roles } from 'src/users/enum/roles.enum';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create category' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCommentDto })
  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Get('getById/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Get('getByCourseId/:id')
  findByCourseId(@Param('id') id: string) {
    return this.commentsService.findOneByCourseId(id);
  }

  @Get('getByUserId/:id')
  findByUserId(@Param('id') id: string) {
    return this.commentsService.findOneByUserId(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @ApiOperation({ summary: 'Create category' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCommentDto })
  @Delete('deleteById/:id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
