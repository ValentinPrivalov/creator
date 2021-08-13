import {TiledLayerNames} from "./tiled-names";
import {Point} from "pixi.js";

export interface ILayer {
    id: number;
    name: string;
    opacity: number;
    visible: boolean;
    x: number;
    y: number;
    offsetx: number;
    offsety: number;
    type: TiledLayerNames;
    layers: Array<ILayer>;
    objects?: Array<ILayerObject>;
    properties?: Array<{ name: string, value: string }>;
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
