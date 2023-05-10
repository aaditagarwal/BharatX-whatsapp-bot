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
            await axios.post(
                `https://graph.facebook.com/v16.0/${this.initInput.businessPhoneNumber}/messages`,
                JSON.stringify(message),
                {headers: {
                    Authorization: `Bearer ${this.initInput.authorizationToken}`,
                    'Content-Type': 'application/json',
                    'X-Waba-Id': this.initInput.wabaId
                }}
            );
        } catch(err) {
            throw err;
        }

    }

    private parseTemplateVariables(
        templateVariables: Object | string[],
    ): any {
        var templateComponentsObj = [{
            'type': 'body',
            'parameters':[]
        }]; 
        if(Array.isArray(templateVariables)){
            templateVariables.forEach(variable => {
                templateComponentsObj['parameters'].push({
                    "type": "text",
                    "text": variable
                });
            });
        } else {
            templateComponentsObj['parameters'].push(templateVariables);
        }
        return templateComponentsObj;
    }

}