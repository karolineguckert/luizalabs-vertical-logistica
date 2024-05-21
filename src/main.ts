import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
