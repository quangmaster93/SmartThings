

import type { AppEvent } from "./AppEvent";
import { User } from "../models/User";
import { Device } from "../models/Device";
import { DeviceChecker } from "../models/DeviceChecker";

export class AppState {
    event: AppEvent;
    token: string;
    someValue: string;
    focusedRoute:string;
    userInfo: User;
    deviceStt: any;
    userDevices: Array<Device>
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
    // savedDevices:null
}

export {
    defaultState
};
