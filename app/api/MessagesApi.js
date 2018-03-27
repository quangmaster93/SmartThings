import Network from "./Network";

export default class MessagesApi {

    static sendAction(ddid: string, actionName: string, data: any, type: string = "action") {
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
            console.log(res);
        })
    }
}