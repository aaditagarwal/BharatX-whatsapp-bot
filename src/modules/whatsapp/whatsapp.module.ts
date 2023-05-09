import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { WhatsappController } from "./whatsapp.controller";
import { WhatsappService } from "./whatsapp.service";

@Module({
    imports: [ConfigModule],
    controllers: [WhatsappController],
    providers: [WhatsappService]
})

export class WhatsappModule {}