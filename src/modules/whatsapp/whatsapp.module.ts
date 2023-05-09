import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { WhatsappService } from "./whatsapp.service";
import { ApiModule } from "../api/api.module";

@Module({
    imports: [ConfigModule, ApiModule],
    providers: [WhatsappService]
})

export class WhatsappModule {}