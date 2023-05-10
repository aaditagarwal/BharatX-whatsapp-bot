import { Module } from "@nestjs/common";
import { WhatsappService } from "./whatsapp.service";
import { ApiModule } from "../api/api.module";

@Module({
    imports: [ApiModule],
    providers: [WhatsappService]
})

export class WhatsappModule {}