import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.model';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}
  async create({ stars, message, course, user }) {
    try {
      const comment = this.commentRepository.create({
        stars,
        message,
        course,
        user,
      });
      await this.commentRepository.save(comment);
      return {
        message: 'Los comentarios se han enviado correctamente',
        statusCode: '200',
      };
    } catch (err) {
      return { message: 'Algo salió mal', statusCode: '403' };
    }
  }

  async findAll() {
    const comments = await this.commentRepository.find({
      order: {
        updatedAt: 'DESC',
      },
    });
    comments.map((comment) => {
      delete comment.user.refreshToken;
      delete comment.user.role;
      delete comment.user.password;
    });
    return comments;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async findOneByCourseId(id: string) {
    const comments = await this.commentRepository.find({
      where: {
        course: {
          id: id,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    comments.map((comment) => {
      delete comment.user.refreshToken;
      delete comment.user.role;
      delete comment.user.password;
    });
    return comments;
  }

  async findOneByUserId(id: string) {
    const comments = await this.commentRepository.find({
      where: {
        user: {
          id: id,
        },
      },
    });
    comments.map((comment) => {
      delete comment.user.refreshToken;
      delete comment.user.role;
      delete comment.user.password;
    });
    return comments;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    const commment = await this.commentRepository.delete(id);
    console.log(`Removing ${id} comment`, commment);
    if (commment.affected) {
      return {
        message: 'comentario eliminado con exito',
      };
    } else {
      return {
        message: 'comentario no encontrado',
      };
    }
  }
}
