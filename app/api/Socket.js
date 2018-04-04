// @flow

import Network from "./Network";
import { AppStorage } from "../redux/AppStorage";

export default class Socket {
    /**
     * Tracking devices data by devices
     * @param {*} sdids array off source devices id to track
     * @param {*} uid user id
     */
    static LiveByDevices(sdids: string, overrideCommon?: boolean, uid?: string) {
        //let sdidsString = sdids.join(",");
        uid = uid || AppStorage.getState().userInfo.id;
        let url = `wss://api.artik.cloud/v1.1/live?sdids=${sdids}&uid=${uid}&Authorization=bearer+${Network.token}`;
        var ws = new WebSocket(url);
        if (overrideCommon) {
            this.CommonWS = ws;
        }
        return ws;
    }

    static CommonWS: WebSocket;

    /**
     * Tracking devices data by device type
     * @param {*} sdtids array off source device type id to track
     * @param {*} uid user id
     */
    static LiveByDeviceType(sdtids: string, uid?: string) {
        let url = `wss://api.artik.cloud/v1.1/live?sdtids=${sdtids}&uid=${uid}&Authorization=bearer+${Network.token}`;
        var ws = new WebSocket(url);
        return ws;
    }

    /**
     * Tracking devices data by user
     * @param {*} uid user id
     */
    static LiveByDeviceType(uid: string) {
        let url = `wss://api.artik.cloud/v1.1/live?uid=${uid}&Authorization=bearer+${Network.token}`;
        var ws = new WebSocket(url);
        return ws;
    }

    static OpenCommonWS(sdids: string) {
        let ws = Socket.LiveByDevices(sdids);
        ws.onmessage = (e: any) => {
            // a message was received
            let responseData = JSON.parse(e.data);
            console.log("root", responseData);
            if (responseData.type != "ping") {
                AppStorage.postEvent("DEVICE_STATUS_CHANGE", responseData)
            }

        }
    }
}