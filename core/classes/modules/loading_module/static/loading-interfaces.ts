import {ILayer} from "../../layers_module/static/layers-interfaces";

export interface ISceneData {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    layers: Array<ILayer>;
    tilesets: Array<ITileSet>;
}

export interface ITileSet {
    tiles: Array<ITile>;
    tilewidth: number;
    tileheight: number;
}

export interface ITile {
    image: string;
    imageheight: number;
    imagewidth: number;
}
