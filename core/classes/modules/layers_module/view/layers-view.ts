import {AbstractView} from "../../../../lib/mvc/view";
import {Sprite, Texture, LoaderResource} from "pixi.js";
import {LayersNames} from "../static/layers-names";
import {Signals} from "../../../../global/signals";
import {ITiledLayer, ITiledLayerObject, ITiledProperty} from "../../../../lib/tiled/tiled-interfaces";
import {TiledLayerNames} from "../../../../lib/tiled/tiled-names";
import {Collection} from "../../../../util/collection";
import {IMapData} from "../../loading_module/static/loading-interfaces";
import {ISceneSize} from "../../graphics_module/static/graphics-interfaces";
import {Layer} from "./layer";

export class LayersView extends AbstractView {
    public createLayers(assets: Collection): void {
        assets.forEach((mapId: string, map: IMapData) => {
            map.sceneData.layers.forEach((tiledLayer: ITiledLayer) => {
                const rootLayer: Layer = this.createLayer(map, tiledLayer);
                this.sceneManager.add(rootLayer);
            });
        });
        this.sceneManager.stage.addChild(this.sceneManager.get(LayersNames.ROOT));
        this.raiseSignal(Signals.MAIN_SCENE_CREATED);
    }

    protected createLayer(map: IMapData, tiledLayer: ITiledLayer, parentLayer?: Layer): Layer {
        const layer: Layer = new Layer();
        layer.name = tiledLayer.name;
        layer.alpha = tiledLayer.opacity;
        layer.visible = tiledLayer.visible;
        layer.position.set(tiledLayer.offsetx, tiledLayer.offsety);

        tiledLayer.properties?.forEach((property: ITiledProperty) =>
            layer.properties[property.name] = property.value);
        tiledLayer.layers?.forEach((childLayer: ITiledLayer) =>
            this.createLayer(map, childLayer, layer));
        tiledLayer.objects?.map((obj: ITiledLayerObject) =>
            this.createObject(map, obj, layer));

        switch (tiledLayer.type) {
            case TiledLayerNames.GROUP:
                this.raiseSignal(Signals.LAYER_CREATED, layer);
                break;
            case TiledLayerNames.TILE_LAYER:
                this.createTileLayer(map, tiledLayer, layer);
                break;
        }

        parentLayer?.addChild(layer);
        return layer;
    }

    protected createObject(map: IMapData, obj: ITiledLayerObject, parentLayer: Layer): void {
        if (obj.gid) {
            this.createImageObject(map, obj, parentLayer);
        }
        if (obj.point) {

        }
        if (obj.polygon) {

        }
        if (obj.ellipse) {

        }
    }

    protected createImageObject(map: IMapData, obj: ITiledLayerObject, parentLayer: Layer): Sprite {
        const texture: Texture = this.getTextureByGID(map, obj.gid);
        const image: Sprite = new Sprite(texture);
        image.name = obj.name;
        image.width = obj.width;
        image.height = obj.height;
        image.position.set(obj.x, obj.y - obj.height);
        image.rotation = obj.rotation; // todo check
        image.visible = obj.visible;

        parentLayer.addChild(image);
        return image;
    }

    protected createTileLayer(map: IMapData, tiledLayer: ITiledLayer, parentLayer: Layer): void {
        const tileWidth = map.sceneData.tilewidth;
        const tileHeight = map.sceneData.tileheight;
        const sceneSize: ISceneSize = {
            width: tileWidth * tiledLayer.width,
            height: tileHeight * tiledLayer.height,
        }

        tiledLayer.data.forEach((gid: number, index: number) => {
            if (gid !== 0) { // skip empty tile
                const texture: Texture = this.getTextureByGID(map, gid);
                const imageObj: ITiledLayerObject = {
                    gid: gid,
                    x: (tileWidth * index) % sceneSize.width,
                    y: Math.floor(index / tiledLayer.width) * tileHeight,
                    width: texture.width,
                    height: texture.height,
                    rotation: 0,
                    visible: true,
                    name: gid.toString()
                };

                this.createImageObject(map, imageObj, parentLayer);
            }
        });
    }

    protected getTextureByGID(map: IMapData, gid: number): Texture {
        const imageId: string = (gid - 1).toString();
        const images: Collection = map.images;
        const resource: LoaderResource = images.get(imageId);
        return resource.texture;
    }
}
