import {AbstractRenderer, Container} from "pixi.js";
import {Collection} from "../../../../util/collection";

export class SceneManager {
    private sceneCollection: Collection = new Collection();
    public renderer: AbstractRenderer;
    public stage: Container;

    add(scene: Container): void {
        this.sceneCollection.addItem(scene.name, scene, false);
    }

    get(name: string): Container {
        return this.sceneCollection.getItem(name);
    }
}
