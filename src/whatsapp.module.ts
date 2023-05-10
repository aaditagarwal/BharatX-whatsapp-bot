import { DynamicModule, Module } from "@nestjs/common";
import { WhatsappService } from "./whatsapp.service";

interface initInputObject {
    authorizationToken: string;
    wabaId: string;
    businessPhoneNumber: string;
}

@Module({})
export class WhatsappModule{
    static forRoot(
        input: initInputObject,
    ): DynamicModule {
        const providers = [
            {
                provide: WhatsappService,
                useValue: new WhatsappService(input),
            },
        ];

        return {
            providers: providers,
            exports: providers,
            module: WhatsappModule,
        };
    }
}