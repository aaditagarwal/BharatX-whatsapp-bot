import { Injectable } from "@nestjs/common";
import axios from 'axios';

interface initInputObject {
    authorizationToken: string;
    wabaId: string;
    businessPhoneNumber: string;
}

@Injectable()
export class WhatsappService {

    private initInput: initInputObject
    constructor(
        input: initInputObject
    ) {
        this.initInput = Object.assign(
            {},
            input
        );
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
                `https://graph.facebook.com/v16.0/${this.initInput.businessPhoneNumber}/messages`,
                JSON.stringify(message),
                {headers: {
                    Authorization: `Bearer ${this.initInput.authorizationToken}`,
                    'Content-Type': 'application/json',
                    'X-Waba-Id': this.initInput.wabaId
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