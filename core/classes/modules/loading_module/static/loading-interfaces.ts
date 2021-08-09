import {ILayer} from "../../layers_module/static/layers-interfaces";

export interface ISceneData {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    layers: Array<ILayer>;
}
