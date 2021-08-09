import {AbstractRenderer, Container} from "pixi.js";
import {AbstractCollection} from "../../../../util/abstract-collection";
import {ISceneSize} from "../static/graphics-interfaces";

export class SceneManager {
    private sceneCollection: AbstractCollection = new AbstractCollection();
    public renderer: AbstractRenderer;
    public stage: Container;

    add(scene: Container): void {
        this.sceneCollection.addItem(scene.name, scene, false);
    }

    get(name: string): Container {
        return this.sceneCollection.getItem(name);
    }
}
