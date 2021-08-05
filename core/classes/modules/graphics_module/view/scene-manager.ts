import {AbstractRenderer, Container} from "pixi.js";
import {ISceneSize} from "./graphics-view";

export class SceneManager {
    private _scenes: Array<Container> = [];
    public renderer: AbstractRenderer;
    public stage: Container;
    public sceneSize: ISceneSize;

    add(scene: Container): void {
        this._scenes.push(scene);
    }

    get(name: string): Container {
        return this._scenes.find((scene: Container) => scene.name === name);
    }
}
