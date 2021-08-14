import {ISceneData} from "../../../../lib/tiled/tiled-interfaces";
import {Collection} from "../../../../util/collection";
import {LoaderResource} from "pixi.js";

export interface ILevelData {
    name: string;
    path: string;
}

export interface IMapData {
    sceneData: ISceneData;
    images: Collection<LoaderResource>;
}
