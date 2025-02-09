import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserLoginService } from './user/user.login.service';
import { DownloadService } from './download/download.service';
import { UserController } from './user/user.controller';
import { DownloadController } from './download/download.controller';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { TextSpeechController } from './text-speech/text-speech.controller';

@Module({
  controllers: [
    AppController,
    UserController,
    DownloadController,
    UploadController,
    TextSpeechController,
  ],
  providers: [
    AppService,
    UserService,
    UserLoginService,
    DownloadService,
    UploadService,
  ],
  imports: [UploadModule],
})
export class AppModule {}
