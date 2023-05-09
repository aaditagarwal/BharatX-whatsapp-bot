import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ApiService {

    async postRequest(
        url: string,
        paylod: object,
        authHeaders: {
            authorizationToken: string,
            wabaId: string
        }
    ) : Promise<object> {
        try{
            const apiResponse = await axios.post(
                url,
                paylod,
                {headers: {
                    Authorization: `Bearer ${authHeaders?.authorizationToken}`,
                    'Content-Type': 'application/json',
                    'X-Waba-Id': authHeaders?.wabaId
                }}
            );
            return apiResponse;
        } catch(err) {
            throw err;
        }
    }
}