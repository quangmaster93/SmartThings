// @flow
import { createStore, Action } from "redux";
import { AppState, defaultState } from "./AppState";
import type { AppEvent } from "./AppEvent";

export class AppStorage {
    static appReducer(state: AppState = defaultState, action: Action): AppState {
        state.event = action.type;

        switch (action.type) {
            case "INITIALIZE":
                console.log("initialize app store");
                break;
            case "SAVE_TOKEN":
                return {
                    ...state, token: action.payload
                }
            case "SET_FOCUSED_SCREEN":
                return {
                    ...state, focusedRoute: action.payload
                }
        }

        return { ...state };
    }

    static postEvent(event: AppEvent, data: any) {
        this.getStore().dispatch({ type: event, payload: data });
    }

    static subscribe(listener: (state: AppState) => void) {
        return this.getStore().subscribe(() => {
            listener(this.getStore().getState());
        });
    }

    static getStore() {
        return this.store;
    }

    static getState(): AppState {
        return this.getStore().getState();
    }

    static store = createStore(AppStorage.appReducer);

}

// class AppAction<T, Data> extends Action {
//     type: T;
//     payload: Data;
//     constructor() {
//         super()
//     }
// }