

import type { AppEvent } from "./AppEvent";
import { User } from "../models/User";
import { Device } from "../models/Device";
import { Scene } from "../models/Scene";
import { DeviceChecker } from "../models/DeviceChecker";

export class AppState {
    event: AppEvent;
    token: string;
    someValue: string;
    focusedRoute:string;
    userInfo: User;
    deviceStt: any;
    userDevices: Array<Device>
    userScenes:Array<Scene>
    // savedDevices:Array<DeviceChecker>
}

let defaultState: AppState = {
    event: "INITIALIZE",
    token: "TOKEN",
    someValue: "",
    focusedRoute:"",
    userInfo: null,
    deviceStt: null, 
    userDevices:null,
    userScenes:null
    // savedDevices:null
}

export {
    defaultState
};
