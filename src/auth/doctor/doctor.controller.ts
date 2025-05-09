import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CookieGetter } from '../../common/decorators/cookie.getter.decorator';
import { DoctorService } from './doctor.service';
import { SignInDoctorDto } from './dto/sign-in-doctor.dto';

@Controller('auth/doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post("sign-in")
  async signInDoctor(
    @Body() signInDoctorDto: SignInDoctorDto,
    @Res({passthrough: true}) res: Response
    ){
    return this.doctorService.signInDoctor(signInDoctorDto, res)
  }

//   @HttpCode(200)
//   @Post("sign-out")
//   signOut(
//     @CookieGetter("refresh_token") refreshToken: string,
//     @Res({passthrough: true}) res: Response
//   ){
//     return this.d.signOutPatient(refreshToken, res)
//   }

//   @HttpCode(200)
//   @Post(":id/refresh")
//   refreshPatient(
//     @Param("id", ParseIntPipe) id: number,
//     @CookieGetter("refresh_token") refreshToken: string,
//     @Res({passthrough: true}) res: Response
//   ){
//     return this.patientService.refreshTokenPatient(id, refreshToken, res)
//   }
}
