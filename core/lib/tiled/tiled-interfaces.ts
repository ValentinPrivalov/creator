import {TiledLayerNames} from "./tiled-names";

export interface ILayer {
    id: number;
    name: string;
    opacity: number;
    visible: boolean;
    x: number;
    y: number;
    type: TiledLayerNames;
    layers: Array<ILayer>;
    objects?: Array<ILayerObject>;
}

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
    id: number;
    image: string;
    imageheight: number;
    imagewidth: number;
}

export interface ILayerObject {
    gid: number;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    visible: boolean;
}
