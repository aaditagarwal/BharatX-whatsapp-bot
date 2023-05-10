import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module'
import { WhatsappService } from './modules/whatsapp/whatsapp.service';
import { ApiModule } from './modules/api/api.module';

@Module({
  imports: [WhatsappModule, ApiModule],
  controllers: [AppController],
  providers: [AppService, WhatsappService],
})
export class AppModule {}
