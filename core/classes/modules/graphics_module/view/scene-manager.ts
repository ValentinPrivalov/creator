import {AbstractRenderer, Container} from "pixi.js";
import {ISceneSize} from "./graphics-view";
import {AbstractCollection} from "../../../../util/abstract-collection";

export class SceneManager {
    private sceneCollection: AbstractCollection = new AbstractCollection();
    public renderer: AbstractRenderer;
    public stage: Container;
    public sceneSize: ISceneSize;

    add(scene: Container): void {
        this.sceneCollection.addItem(scene.name, scene, false);
    }

    get(name: string): Container {
        return this.sceneCollection.getItem(name);
    }
}
