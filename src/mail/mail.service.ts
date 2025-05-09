import { Injectable } from '@nestjs/common';
import { Patient } from '../patients/models/patient.model';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}

    async sendMail(patient: Patient){
        const url = `${process.env.API_HOST}/api/patients/activate/${patient.activation_link}`
        console.log(url)

        await this.mailerService.sendMail({
            to: patient.email,
            subject: "Welcome to Xususiy Shifoxona App!",
            template: "./confirmation",
            context:{
                full_name: patient.full_name,
                url
            }
        })
    }
}
