// @flow
import type { AppEvent } from "./AppEvent"

export interface AppState {
    event: AppEvent;
    token: string;
    someValue: string;
    focusedRoute:string;
}

let defaultState: AppState = {
    event: "INITIALIZE",
    token: "TOKEN",
    someValue: "",
    focusedRoute:""
}

export {
    defaultState
};
