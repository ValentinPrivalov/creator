import {ISceneData} from "../../../../lib/tiled/tiled-interfaces";
import {Collection} from "../../../../util/collection";

export interface ILevelData {
    name: string;
    path: string;
}

export interface IMapData {
    sceneData: ISceneData;
    images: Collection;
}
