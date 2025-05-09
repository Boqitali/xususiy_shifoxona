import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CookieGetter } from '../../common/decorators/cookie.getter.decorator';
import { StaffService } from './staff.service';
import { SignInStaffDto } from './dto/sign-in-staff.dto';

@Controller('auth/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post("sign-in")
  async signInDoctor(
    @Body() signInStaffDto: SignInStaffDto,
    @Res({passthrough: true}) res: Response
    ){
    return this.staffService.signInStaff(signInStaffDto, res)
  }

  @HttpCode(200)
  @Post("sign-out")
  signOutStaff(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.staffService.signOutStaff(refreshToken, res)
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refreshStaff(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.staffService.refreshTokenStaff(id, refreshToken, res)
  }
}
