import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.model';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
  ) {}

  async create({ course, discount, name }) {
    try {
      const existing = await this.couponRepository.findOne({
        where: {
          course,
          name,
        },
      });
      if (existing) {
        return {
          message: 'Cupón en curso ya existe',
          statusCode: 403,
        };
      }
      const coupon = this.couponRepository.create({
        course,
        discount,
        name,
      });
      await this.couponRepository.save(coupon);
      return {
        message: 'cupón añadido con éxito',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      return { message: 'Algo salió mal', statusCode: '403' };
    }
  }

  async findAll() {
    return await this.couponRepository.find({
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async findOne(id) {
    return await this.couponRepository.findOne(id);
  }
  async verifyCoupon({ name, course }) {
    try {
      const existing = await this.couponRepository.findOne({
        where: {
          course,
          name,
        },
      });
      if (existing) {
        return {
          message: 'Cupón verificado',
          statusCode: 200,
          coupon: existing,
        };
      } else {
        return {
          message: 'Cupón no válido',
          statusCode: 403,
        };
      }
    } catch (err) {
      return { message: 'Algo salió mal', statusCode: '403' };
    }
  }

  async update(id, updateCouponDto: UpdateCouponDto) {
    try {
      const existing = await this.couponRepository.findOne({
        where: {
          course: updateCouponDto.course,
          name: updateCouponDto.name,
        },
      });
      if (existing) {
        return {
          message: 'Cupón en curso ya existe',
          statusCode: 403,
        };
      }
      const coupon = this.couponRepository.findOne(id);
      if (coupon) {
        const updated = await this.couponRepository.update(id, updateCouponDto);
        if (updated.affected) {
          return { message: 'actualizado con éxito', statusCode: '200' };
        }
      } else {
        return { message: 'cupón inválido', statusCode: '200' };
      }
    } catch (error) {
      console.log(`update error: ${error}`);
      return { message: 'cupón no encontrado', statusCode: '403' };
    }
  }

  async remove(id) {
    const coupon = await this.couponRepository.delete(id);
    if (coupon.affected) {
      return {
        message: 'comentario eliminado con exito',
        statusCode: '200',
      };
    } else {
      return {
        message: 'comentario no encontrado',
      };
    }
  }
}
