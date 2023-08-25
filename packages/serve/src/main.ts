import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //   app.useStaticAssets(join(__dirname, 'static_files'), {
  //     prefix: '/chou_file',
  //   });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  app.use(
    session({
      secret: 'wangfugui',
      name: 'chou',
      rolling: true,
      cookie: { httpOnly: true },
    }),
  );
  await app.listen(3000);
}
bootstrap();
