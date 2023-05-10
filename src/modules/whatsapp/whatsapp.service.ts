import { Injectable } from "@nestjs/common";
import axios from 'axios';

@Injectable()
export class WhatsappService {

    constructor(
        private authorizationToken: string,
        private wabaId: string,
        private businessPhoneNumber: string,
    ) {}

    init(authorizationToken, wabaId, businessPhoneNumber): void {
        this.authorizationToken = authorizationToken;
        this.wabaId = wabaId;
        this.businessPhoneNumber = businessPhoneNumber;
    }

    async sendMessage(
        templateId: string,
        destinationPhoneNumber: string,
        templateVariables: Record<string, string> | string[],
    ): Promise<void> {
        const templateComponents = this.parseTemplateVariables(templateVariables);

        const message = {
            messaging_product: "whatsapp",
            recipient_type: 'individual',
            to: `${destinationPhoneNumber}`,
            type: 'template',
            template: {
                name: templateId,
                language: {
                    policy: 'deterministic',
                    code: 'en_US',
                },
                components: templateComponents
            }
        };

        try{
            const apiResponse = await axios.post(
                `https://graph.facebook.com/v16.0/${this.businessPhoneNumber}/messages`,
                JSON.stringify(message),
                {headers: {
                    Authorization: `Bearer ${this.authorizationToken}`,
                    'Content-Type': 'application/json',
                    'X-Waba-Id': this.wabaId
                }}
            );
            console.log({apiResponse});
        } catch(err) {
            throw err;
        }

    }

    private parseTemplateVariables(
        templateVariables: Object | string[],
    ): any {
        var templateComponentsObj = {}; 
        Array.isArray(templateVariables)
            ? templateComponentsObj = {
                'type': templateVariables[0],
                'currency': templateVariables[1],
                'date_time': templateVariables[2],
                'text': templateVariables[3]
            }
            : Object.keys(templateVariables).forEach(keyValue => {
                if( keyValue==='currency' || keyValue==='date_time' || keyValue==='text' || keyValue==='type' ){
                    templateComponentsObj[keyValue] = templateVariables[keyValue];
                }
            });
        return templateComponentsObj;
    }

}