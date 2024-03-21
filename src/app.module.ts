import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })], //will make env variables available to the entire application
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
