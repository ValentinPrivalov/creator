import {TiledLayerNames} from "./tiled-names";
import {Point} from "pixi.js";

export interface ITiledEntity {
    width: number;
    height: number;
    properties?: Array<ITiledProperty>;
}

export interface ITiledLayer extends ITiledEntity {
    id: number;
    name: string;
    opacity: number;
    visible: boolean;
    x: number;
    y: number;
    offsetx: number;
    offsety: number;
    type: TiledLayerNames;
    data?: Array<number>;
    layers?: Array<ITiledLayer>;
    objects?: Array<ITiledLayerObject>;
}

export interface ISceneData extends ITiledEntity {
    tilewidth: number;
    tileheight: number;
    layers: Array<ITiledLayer>;
    tilesets: Array<ITileSet>;
}

export interface ITileSet {
    tiles: Array<ITile>;
    tilewidth: number;
    tileheight: number;
}

export interface ITile extends ITiledEntity {
    id: number;
    image: string;
    imageheight: number;
    imagewidth: number;
}

export interface ITiledLayerObject extends ITiledEntity {
    x: number;
    y: number;
    rotation: number;
    visible: boolean;
    name: string;
    gid?: number;
    point?: boolean;
    polygon?: Array<Point>;
    ellipse?: boolean;
}

export interface ITiledProperty {
    name: string;
    type: string;
    value: any;
}
