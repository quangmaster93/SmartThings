import Network from "./Network";
import { DeviceStatus } from "../models/DeviceStatus";

export default class DevicesApi {
    static getDeviceStatus(deviceId: string, callBack: Function) {
        let patch = `/devices/${deviceId}/status`;
        Network.get(patch, (responseJson) => {
            console.log(patch);
            console.log(responseJson);
            let status: DeviceStatus = JSON.parse(responseJson._bodyInit).data;
            callBack(status);
        })
    }

    
    /**
     * 
     * @param {*} devices List of device ids (comma-separated) for which the statuses are requested.
     * @param {*} includeSnapshot 
     * @param {*} includeSnapshotTimestamp 
     * @param {*} callBack 
     */
    static getUserDevicesStatus(devices: string, includeSnapshot?: boolean, includeSnapshotTimestamp?: boolean, callBack?: Function){
        let patch = `/devices/status?dids=${devices}`;
        patch = includeSnapshot != null ? `${patch}&includeSnapshot=${includeSnapshot.toString()}` : patch;
        patch = includeSnapshotTimestamp != null ? `${patch}&includeSnapshotTimestamp=${includeSnapshotTimestamp.toString()}` : patch;

        Network.get(patch, (responseJson) => {
            type IDevice = {
                did: string,
                data: any,
            }
            let devicesStatus: Array<IDevice> = JSON.parse(responseJson._bodyInit).data;
            if(callBack){
                callBack(devicesStatus);
            }
        })
    }
}