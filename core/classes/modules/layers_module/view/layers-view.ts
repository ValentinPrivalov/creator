import {AbstractView} from "../../../../lib/mvc/view";
import {Container, DisplayObject, Sprite} from "pixi.js";
import {LayersNames} from "../static/layers-names";
import {Signals} from "../../../../global/signals";
import {ILayer, ILayerObject} from "../../../../lib/tiled/tiled-interfaces";
import {TiledLayerNames, TiledObjectNames} from "../../../../lib/tiled/tiled-names";
import {Names} from "../../../../global/names";
import {LoadingModel} from "../../loading_module/model/loading-model";
import {Collection} from "../../../../util/collection";
import {IMapData} from "../../loading_module/static/loading-interfaces";

export class LayersView extends AbstractView {
    public createLayers(assets: Collection): void {
        assets.forEach((mapId: string, item: IMapData) => {
            item.sceneData.layers.forEach((layer: ILayer) => {
                const container: Container = this.createLayer(mapId, layer);
                this.sceneManager.add(container);
            });
        });
        this.sceneManager.stage.addChild(this.sceneManager.get(LayersNames.ROOT));
    }

    protected createLayer(mapId: string, layer: ILayer, parent?: Container): Container {
        let gameObject: DisplayObject = null;
        let group: Array<DisplayObject> = [];

        switch (layer.type) {
            case TiledLayerNames.GROUP:
                gameObject = this.createGroup(mapId, layer) as Container;
                parent?.addChild(gameObject);
                this.raiseSignal(Signals.LAYER_CREATED, gameObject);
                break;
            case TiledLayerNames.OBJECT_GROUP:
                group = this.createObjectGroup(mapId, layer) as Array<DisplayObject>;
                parent?.addChild(...group);
                break;
        }

        return gameObject as Container;
    }

    protected createGroup(mapId: string, layer: ILayer): Container {
        const gameObject: Container = new Container();
        gameObject.name = layer.name;
        gameObject.alpha = layer.opacity;
        gameObject.position.set(layer.x, layer.y);
        layer.layers.forEach((childLayer: ILayer) => {
            this.createLayer(mapId, childLayer, gameObject as Container);
        });

        return gameObject;
    }

    protected createObjectGroup(mapId: string, layer: ILayer): Array<DisplayObject> {
        let gameObjects: Array<DisplayObject> = [];

        switch (layer.name) {
            case TiledObjectNames.IMAGE:
                gameObjects = layer.objects?.map((obj: ILayerObject) =>
                    this.createImageObject(mapId, obj) as Sprite);
                break;
        }
        return gameObjects;
    }

    protected createImageObject(mapId: string, obj: ILayerObject): Sprite {
        const loadingModel: LoadingModel = this.getModel(Names.Views.LOADING_SCREEN);
        const mapData: IMapData = loadingModel.getData().get(mapId);
        const resource = mapData.images.get((obj.gid - 1).toString());
        const nameParts: Array<string> = resource.url.split('/');

        const image: Sprite = new Sprite(resource.texture);
        image.name = nameParts[nameParts.length - 1];
        image.width = obj.width;
        image.height = obj.height;
        image.rotation = obj.rotation; // todo check
        image.visible = obj.visible;

        return image;
    }
}
