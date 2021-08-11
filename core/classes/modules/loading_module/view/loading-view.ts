import {AbstractView} from "../../../../lib/mvc/view";
import {Graphics} from "pixi.js";

export class LoadingView extends AbstractView {
    static rectName: string = 'rectangle';

    public drawTestRect(): void {
        const rect: Graphics = new Graphics();
        rect.name = LoadingView.rectName;
        rect.position.set(100, 100);
        rect.beginFill(0xff0000);
        rect.drawRect(0, 0, 200, 200);
        rect.endFill();
        rect.interactive = true;
        rect.buttonMode = true;

        this.display.addChild(rect);
    }
}
