import {AbstractRenderer, Container} from "pixi.js";
import {Collection} from "../../util/collection";

export class SceneManager {
    private sceneCollection: Collection = new Collection();
    public renderer: AbstractRenderer;
    public stage: Container;

    add(scene: Container): void {
        this.sceneCollection.add(scene.name, scene);
    }

    get(name: string): Container {
        return this.sceneCollection.get(name);
    }
}
