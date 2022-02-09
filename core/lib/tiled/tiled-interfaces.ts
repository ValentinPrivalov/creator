import { TiledLayerNames } from './tiled-names';
import { Point } from 'pixi.js';

export interface ITiledEntity {
    width: number;
    height: number;
    name: string;
    properties?: Array<ITiledProperty>;
}

export interface ITiledLayer extends ITiledEntity {
    id: number;
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
    spines?: Array<string>;
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
    gid?: number;
    point?: boolean;
    polygon?: Array<Point>;
    ellipse?: boolean;
}

export interface ITiledPoint extends ITiledEntity {
    x: number;
    y: number;
    point: boolean;
}

export interface ITiledProperty {
    name: string;
    type: string;
    value: any;
}

export interface ITransformedParams {
    gid: number;
    offsetX: number;
    offsetY: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
}
