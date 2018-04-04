import { AppEvent } from "./AppEvent";
import { User } from "../models/User";

// @flow

export class AppState {
    event: AppEvent;
    token: string;
    someValue: string;
    focusedRoute:string;
    userInfo: User;
    deviceStt: any
}

let defaultState: AppState = {
    event: "INITIALIZE",
    token: "TOKEN",
    someValue: "",
    focusedRoute:"",
    userInfo: null,
    deviceStt: null
}

export {
    defaultState
};
