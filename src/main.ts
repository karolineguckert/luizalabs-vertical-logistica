import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      {
        rawBody: true,
      },
  );
  await app.listen(3000); //TODO colocar na env a  port
}
bootstrap();
