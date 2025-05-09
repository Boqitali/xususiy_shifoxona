import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';
import { SignInPatientDto } from './dto/sign-in-patient.dto';
import { Response } from 'express';
import { CookieGetter } from '../../common/decorators/cookie.getter.decorator';

@Controller('auth/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post("sign-up")
  async signUp(@Body() createPatientDto: CreatePatientDto){
    return this.patientService.signUpPatient(createPatientDto)
  }

  @Post("sign-in")
  async signIn(
    @Body() signInPatientDto: SignInPatientDto,
    @Res({passthrough: true}) res: Response
){
    return this.patientService.signInPatient(signInPatientDto, res)
  }

  @HttpCode(200)
  @Post("sign-out")
  signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.patientService.signOutPatient(refreshToken, res)
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refreshPatient(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.patientService.refreshTokenPatient(id, refreshToken, res)
  }
}
