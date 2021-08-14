import {TiledLayerNames} from "./tiled-names";
import {Point} from "pixi.js";

export interface ITiledLayer {
    id: number;
    name: string;
    opacity: number;
    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    offsetx: number;
    offsety: number;
    type: TiledLayerNames;
    data?: Array<number>;
    layers?: Array<ITiledLayer>;
    objects?: Array<ITiledLayerObject>;
    properties?: Array<{ name: string, value: string }>;
}

export interface ISceneData {
    width: number;
    height: number;
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

export interface ITile {
    id: number;
    image: string;
    imageheight: number;
    imagewidth: number;
}

export interface ITiledLayerObject {
    x: number;
    y: number;
    width: number;
    height: number;
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
