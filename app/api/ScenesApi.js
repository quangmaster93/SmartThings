// @flow
import Network from "./Network";
import { Scene } from "../models/Scene";
import { AppStorage } from "../redux/AppStorage";

export default class ScenesApi {
    static activeScene(sceneID: string, callBack?: Function) {
        let patch = `/scenes/${sceneID}`
        console.log(patch);
        return Network.post(patch, "{}", (responseJson) => {
            console.log(responseJson);
            if(callBack){
                callBack();
            }
        })
    }

    static updateScene(scene: Scene, callBack?: Function) {
        let patch = `/scenes/${scene.id}`
        return Network.put(patch, JSON.stringify(scene), (responseJson) => {
            console.log(responseJson);
            if(callBack){
                callBack();
            }
        })
    }

    static createScene(scene: Scene, callBack?: Function) {
        let patch = `/scenes`

        if(!scene.description){
            scene.description = scene.name;
        }

        let postData = {
            "uid": scene.uid,
            "name": scene.name,
            "description": scene.description,
            "actions": scene.actions
        }

        let postStringData = JSON.stringify(scene);
        console.log(postStringData);

        return Network.post(patch, JSON.stringify(postData), (responseJson) => {
            console.log(responseJson);
            if(callBack){
                callBack();
            }
        })
    }

    static deleteScene(scene: Scene, callBack?: Function) {
        let patch = `/scenes/${scene.id}`
        return Network.delete(patch, (responseJson) => {
            console.log(responseJson);
            if(callBack){
                callBack();
            }
        })
    }
}