import {ISceneData} from "../../../../lib/tiled/tiled-interfaces";
import {DisplayObject} from "pixi.js";

export interface IMapPath {
    name: string;
    path: string;
}

export interface IMapData {
    sceneData: ISceneData;
    objects: Array<DisplayObject>;
}
