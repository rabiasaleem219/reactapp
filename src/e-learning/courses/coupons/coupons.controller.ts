import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
import { Roles } from 'src/users/enum/roles.enum';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { FindCouponDto } from './dto/find-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { VerifyCouponDto } from './dto/verify-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @Post('create')
  async create(@Body() createCouponDto: CreateCouponDto) {
    return await this.couponsService.create(createCouponDto);
  }
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @Get('findAll')
  findAll() {
    return this.couponsService.findAll();
  }
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @Get('getByIdAndCourse/:id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(id);
  }
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @Put('updateById/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return await this.couponsService.update(id, updateCouponDto);
  }
  @UseGuards(JwtGuard, RoleGuard(Roles.ADMIN))
  @Delete('deleteById/:id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }

  @UseGuards(JwtGuard)
  @Post('verify')
  async verify(@Body() body: VerifyCouponDto) {
    return await this.couponsService.verifyCoupon(body);
  }
}
