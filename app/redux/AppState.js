import { AppEvent } from "./AppEvent";
import { User } from "../models/User";

// @flow

export class AppState {
    event: AppEvent;
    token: string;
    someValue: string;
    focusedRoute:string;
    userInfo: User;
}

let defaultState: AppState = {
    event: "INITIALIZE",
    token: "TOKEN",
    someValue: "",
    focusedRoute:"",
    userInfo: null,
}

export {
    defaultState
};
