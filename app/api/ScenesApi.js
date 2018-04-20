// @flow
import Network from "./Network";
import { Scene } from "../models/Scene";

export default class ScenesApi {
    static activeScene(sceneID: string, callBack?: Function) {
        let patch = `/scenes/${sceneID}`
        console.log(patch);
        return Network.post(patch, "{}", (responseJson) => {
            console.log(responseJson);
            if(callBack){
                callBack();
            }
        })
    }

    static updateScene(scene: Scene, callBack?: Function) {
        let patch = `/scenes/${scene.id}`
        return Network.put(patch, JSON.stringify(scene), (responseJson) => {
            console.log(responseJson);
            if(callBack){
                callBack();
            }
        })
    }

    // static getUserDevices(callBack?: Function){
    //     let userId = AppStorage.getState().userInfo.id;
    //     let patch = `/users/${userId}/devices`;

    //     Network.get(patch, (responseJson) => {
    //         console.log('get user devices');

    //         // response struct: { devices: array,  total: number, offset: number, count: number }
    //         let devices: Array<Device> = JSON.parse(responseJson._bodyInit).data.devices;

    //         if(callBack){
    //             callBack(devices);
    //         }
    //     })
    // }
}