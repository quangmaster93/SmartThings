import { Action } from "./Action";

// @flow

export class Scene {

    id: string;

    uid: string;

    aid: string;

    name: string;

    description: string;

    actions: Array<Action>;
}