import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";

@Injectable()
export class WhatsappService {
    constructor(
        private readonly configService: ConfigService
    ) {}
}