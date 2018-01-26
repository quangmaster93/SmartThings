// @flow
import { AppEvent } from "./AppEvent"

export class AppState {
    event: AppEvent;
    token: string;
    someValue: string;
}

let defaultState: AppState = {
    event: "INITIALIZE",
    token: "TOKEN",
    someValue: ""
}

export {
    defaultState
};
