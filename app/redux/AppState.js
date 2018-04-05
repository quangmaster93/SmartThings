import { AppEvent } from "./AppEvent";
import { User } from "../models/User";
// import { Device } from "../models/Device";

// @flow

export class AppState {
    event: AppEvent;
    token: string;
    someValue: string;
    focusedRoute:string;
    userInfo: User;
    deviceStt: any;
    userDevices: Array<Device>
}

let defaultState: AppState = {
    event: "INITIALIZE",
    token: "TOKEN",
    someValue: "",
    focusedRoute:"",
    userInfo: null,
    deviceStt: null, 
    userDevices:null,
}

export {
    defaultState
};
