import {AbstractView} from "../../../../lib/mvc/view";
import {DisplayObject, LoaderResource, Sprite, Graphics, utils} from "pixi.js";
import {LayersNames} from "../static/layers-names";
import {Signals} from "../../../../global/signals";
import {ITiledLayer, ITiledLayerObject, ITiledProperty, ITileSet} from "../../../../lib/tiled/tiled-interfaces";
import {TiledLayerNames, TiledProperties, TiledPropertyValues} from "../../../../lib/tiled/tiled-names";
import {Collection} from "../../../../util/collection";
import {IMapData} from "../../loading_module/static/loading-interfaces";
import {ISceneSize} from "../../graphics_module/static/graphics-interfaces";
import {Layer} from "./layer";
import {ImageObject} from "./layer-object";
import {Names} from "../../../../global/names";
import {LoadingModel} from "../../loading_module/model/loading-model";
import {TiledUtils} from "../../../../lib/tiled/tiled-utils";

export class LayersView extends AbstractView {
    public createLayers(assets: Collection<IMapData>): void {
        assets.forEach((map: IMapData) => {
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
        layer.sortableChildren = true;

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

        layer.zIndex = TiledUtils.getPropertyValue(tiledLayer, TiledProperties.Z);
        parentLayer?.addChild(layer);
        return layer;
    }

    protected createObject(map: IMapData, obj: ITiledLayerObject, parentLayer: Layer): void {
        const type: string = TiledUtils.getPropertyValue(obj, TiledProperties.TYPE);

        if (obj.gid) {
            this.createImageObject(map, obj, parentLayer);
        } else if (obj.point) {

        } else if (obj.polygon) {

        } else if (obj.ellipse) {

        } else if (type === TiledPropertyValues.GRAPHICS) {
            this.createGraphicsObject(obj, parentLayer);
        }
    }

    protected createImageObject(map: IMapData, obj: ITiledLayerObject, parentLayer: Layer): Sprite {
        const image: ImageObject = new ImageObject();
        image.gid = obj.gid;
        image.name = obj.name;
        image.width = obj.width;
        image.height = obj.height;
        image.position.set(obj.x, obj.y - obj.height);
        image.angle = obj.rotation;
        image.visible = obj.visible;

        map.objects.push(image);
        parentLayer.addChild(image);
        return image;
    }

    protected createGraphicsObject(obj: ITiledLayerObject, parentLayer: Layer): void {
        const color: string = TiledUtils.getPropertyValue(obj, TiledProperties.COLOR);
        const graphics: Graphics = new Graphics();
        graphics.name = obj.name;
        graphics.position.set(obj.x, obj.y);
        graphics.beginFill(utils.string2hex(color));
        graphics.drawRect(0, 0, obj.width, obj.height);
        graphics.endFill();

        parentLayer.addChild(graphics);
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
                const tileSet: ITileSet = map.sceneData.tilesets[0];
                const imageObj: ITiledLayerObject = {
                    gid: gid,
                    x: (tileWidth * index) % sceneSize.width,
                    y: Math.floor(index / tiledLayer.width) * tileHeight,
                    width: tileSet.tilewidth,
                    height: tileSet.tileheight,
                    rotation: 0,
                    visible: true,
                    name: gid.toString()
                };

                this.createImageObject(map, imageObj, parentLayer);
            }
        });
    }

    public updateObjects(resource: LoaderResource): void {
        const loadingModel: LoadingModel = this.getModel(Names.Views.LOADING_SCREEN);
        const [mapName, id] = resource.name.split(loadingModel.loaderResourceIdSeparator);
        loadingModel
            .getData()
            .get(mapName)
            .objects
            .forEach((object: DisplayObject) => {
                if ((object['gid'] - 1).toString() === id) {
                    object['texture'] = resource.texture;
                }
            });
    }
}
