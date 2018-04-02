import Network from "./Network";
import { NormalizedMessages } from "../models/NormalizedMessages";

export default class MessagesApi {

    static sendAction(ddid: string, actionName: string, data: any, type: string = "action",callBack?: Function) {
        let actionData = {
            actions: [{
                name: actionName,
                parameters: data
            }]
        };

        let postData = {
            data: actionData,
            ddid,
            type,
        }

        Network.post('/actions', JSON.stringify(postData), (res) => {
            if(callBack){
                callBack(res);
            }
        })
    }

    static getNormalizedMessagesByDevice(deviceId: string, startDate: number, endDate: number, order: string ="asc", count: number,  callBack?: Function) {
        let patch = `/messages?sdid=${deviceId}&startDate=${startDate}&endDate=${endDate}&order=${order}&count=${count}`;

        Network.get(patch, (responseJson) => {
            let normalizedMessages: NormalizedMessages = JSON.parse(responseJson._bodyInit);
            if(callBack){
                callBack(normalizedMessages);
            }
        })
    }
}