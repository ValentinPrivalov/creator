import { AbstractRenderer, Container } from 'pixi.js';
import { Collection } from '../../util/collection';

export class SceneManager {
    private sceneCollection: Collection<Container> = new Collection();
    public renderer: AbstractRenderer;
    public stage: Container;

    public add(scene: Container): void {
        this.sceneCollection.add(scene.name, scene);
    }

    public get(name: string): Container {
        return this.sceneCollection.get(name);
    }
}
