import Network from "./Network";
import { User } from "../models/User";
import { AppStorage } from "../redux/AppStorage";
import { Device } from "../models/Device";
import { DeviceStatus } from "../models/DeviceStatus";

export default class UsersApi {
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
}