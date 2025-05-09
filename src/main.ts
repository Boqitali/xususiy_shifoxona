import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
const cors = require('cors');
// app.use(cors());

async function start() {
  try {
    const PORT = process.env.PORT || 3030
    const app = await NestFactory.create(AppModule, {logger: ["debug","error"]});
    app.use(cookieParser())
    app.use(cors())
    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "http://xususiy_shifoxona.uz",
          "http://api.xususiy_shifoxona.uz",
          "http://xususiy_shifoxona.vercel.app",
        ];
        if(!origin || allowedOrigins.includes(origin)){
          callback(null, true)
        } else{
          callback(new BadRequestException("Not allwed by Cors"))
        }
      },
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentails: true, // cookie va header
    })
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api")

    const config = new DocumentBuilder()
      .setTitle("Xususiy shifoxona project")
      .setDescription("Xususiy shifoxona REST API")
      .setVersion("1.0")
      .addTag("NestJS", "Validation")
      .addTag("NestJS, swagger, sendMail, tokens, Validation")
      .addBearerAuth()
      .build()

      const document = SwaggerModule.createDocument(app, config)
      SwaggerModule.setup("docs", app, document)
    await app.listen(PORT, () =>{
      console.log(`Server started at: http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.log(error);
  }
}
start();
