import {AbstractView} from "../../../../lib/mvc/view";
import {ILayer} from "../static/scenes-interfaces";
import {Container} from "pixi.js";
import {ScenesNames} from "../static/scenes-names";

export class ScenesView extends AbstractView {
    public createLayers(layers: Array<ILayer>): void {
        layers.forEach((layer: ILayer) => {
            const container: Container = this.createLayer(layer);
            this.sceneManager.add(container);
        });
        this.sceneManager.stage.addChild(this.sceneManager.get(ScenesNames.ROOT));
    }

    protected createLayer(layer: ILayer, parent?: Container): Container {
        const container = new Container();
        container.name = layer.name;
        container.alpha = layer.opacity;
        container.position.set(layer.x, layer.y);
        layer.layers.forEach((childLayer: ILayer) => {
            this.createLayer(childLayer, container);
        })

        if (parent) {
            parent.addChild(container);
        }
        return container;
    }
}
