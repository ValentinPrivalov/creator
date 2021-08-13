import {AbstractView} from "../../../../lib/mvc/view";
import {Container, Sprite, LoaderResource} from "pixi.js";
import {LayersNames} from "../static/layers-names";
import {Signals} from "../../../../global/signals";
import {ILayer, ILayerObject} from "../../../../lib/tiled/tiled-interfaces";
import {TiledLayerNames} from "../../../../lib/tiled/tiled-names";
import {Names} from "../../../../global/names";
import {LoadingModel} from "../../loading_module/model/loading-model";
import {Collection} from "../../../../util/collection";
import {IMapData} from "../../loading_module/static/loading-interfaces";
import {IContainerWrap} from "../static/layers-interfaces";

export class LayersView extends AbstractView {
    public createLayers(assets: Collection): void {
        assets.forEach((mapId: string, item: IMapData) => {
            item.sceneData.layers.forEach((layer: ILayer) => {
                const container: Container = this.createLayer(mapId, layer);
                this.sceneManager.add(container);
            });
        });
        this.sceneManager.stage.addChild(this.sceneManager.get(LayersNames.ROOT));
        this.raiseSignal(Signals.MAIN_SCENE_CREATED);
    }

    protected createLayer(mapId: string, layer: ILayer, parent?: Container): Container {
        const container: Container = new Container();
        container.name = layer.name;
        container.alpha = layer.opacity;
        container.visible = layer.visible;
        container.position.set(layer.offsetx, layer.offsety);
        const containerWrap: IContainerWrap = {container, data: new Collection()};

        layer.layers?.forEach((childLayer: ILayer) =>
            this.createLayer(mapId, childLayer, container as Container));
        layer.objects?.map((obj: ILayerObject) =>
            this.createObject(mapId, obj, containerWrap));

        if (layer.type === TiledLayerNames.GROUP) {
            this.raiseSignal(Signals.LAYER_CREATED, container);
        }

        parent?.addChild(container);
        return container;
    }

    protected createObject(mapId: string, obj: ILayerObject, containerWrap: IContainerWrap): void {
        if (obj.gid) {
            const sprite: Sprite = this.createImageObject(mapId, obj);
            containerWrap.container.addChild(sprite);
        }
        if (obj.point) {

        }
        if (obj.polygon) {

        }
        if (obj.ellipse) {

        }
    }

    protected createImageObject(mapId: string, obj: ILayerObject): Sprite {
        const loadingModel: LoadingModel = this.getModel(Names.Views.LOADING_SCREEN);
        const mapData: IMapData = loadingModel.getData().get(mapId);
        const resource: LoaderResource = mapData.images.get((obj.gid - 1).toString());

        const image: Sprite = new Sprite(resource.texture);
        image.name = obj.name;
        image.width = obj.width;
        image.height = obj.height;
        image.position.set(obj.x, obj.y - obj.height);
        image.rotation = obj.rotation; // todo check
        image.visible = obj.visible;

        return image;
    }
}
