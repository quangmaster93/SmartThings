import Network from "./Network";
import { User } from "../models/User";
import { AppStorage } from "../redux/AppStorage";
import { Device } from "../models/Device";
import { DeviceStatus } from "../models/DeviceStatus";
import { Scene } from "../models/Scene";

export default class UsersApi {
    /**
     * Get a user’s profile
     * @param {*} callBack 
     */
    static getUserProfile(callBack?: Function) {
        return Network.get('/users/self', (responseJson) => {
            console.log('/users/self');
            console.log(responseJson);
            let user: User = JSON.parse(responseJson._bodyInit).data;
            AppStorage.postEvent("SAVE_USER_INFO", user);
            if(callBack){
                callBack(user);
            }
        })
    }

    /**
     * Get a user’s Devices
     * @param {*} callBack 
     */
    static getUserDevices(callBack?: Function){
        let userId = AppStorage.getState().userInfo.id;
        let patch = `/users/${userId}/devices`;

        Network.get(patch, (responseJson) => {
            console.log('get user devices');

            // response struct: { devices: array,  total: number, offset: number, count: number }
            let devices: Array<Device> = JSON.parse(responseJson._bodyInit).data.devices;

            if(callBack){
                callBack(devices);
            }
        })
    }

    /**
     * Get a user’s Scenes
     * @param {*} callBack 
     */
    static getUserScenes(callBack?: Function){
        let state = AppStorage.getState();
        let userId = AppStorage.getState().userInfo.id;
        let patch = `/users/${userId}/scenes`;

        Network.get(patch, (responseJson) => {
            debugger;
            let scenes: Array<Scene> = JSON.parse(responseJson._bodyInit).data.scenes;
            console.log(scenes);
            if(callBack){
                callBack(scenes);
            }
        })
    }
}