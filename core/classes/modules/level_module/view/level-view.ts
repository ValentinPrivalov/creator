import {AbstractView} from "../../../../lib/mvc/view";
import {Container} from "pixi.js";

export class LevelView extends AbstractView {
    public insertLevel(levelName: string): void {
        const level: Container = this.sceneManager.get(levelName);
        this.display.addChild(level);
    }
}
