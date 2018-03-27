// @flow

import Network from "./Network";
import { AppStorage } from "../redux/AppStorage";

export default class Socket {
    /**
     * Tracking devices data by devices
     * @param {*} sdids array off source devices id to track
     * @param {*} uid user id
     */
    static LiveByDevices(sdids: string, uid?: string) {
        //let sdidsString = sdids.join(",");
        uid = uid || AppStorage.getState().userInfo.id;
        let url = `wss://api.artik.cloud/v1.1/live?sdids=${sdids}&uid=${uid}&Authorization=bearer+${Network.token}`;
        var ws = new WebSocket(url);
        return ws;
    }

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
}