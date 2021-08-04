import {
    autoDetectRenderer,
    Container,
    Point,
    PRECISION,
    AbstractRenderer,
    IRendererOptionsAuto,
    Renderer,
    settings,
    Sprite,
    Ticker,
    UPDATE_PRIORITY,
    utils
} from "pixi.js";
import {AbstractView} from "../../../../lib/mvc/view";
import {Signals} from "../../../../global/signals";

export class MainScene extends AbstractView {
    public renderer: AbstractRenderer;
    public scene: Container;
    public sceneSize: ISceneSize = {width: 1280, height: 720};
    public ticker: Ticker;

    public create(): void {
        this.renderer = autoDetectRenderer({...this.sceneSize, ...MainScene.getRendererOptions()});
        this.renderer.view.id = "game";
        document.getElementById('gameFrame').appendChild(this.renderer.view);

        this.ticker = Ticker.shared;
        this.ticker.add(this.loop.bind(this));
        this.raiseSignal(Signals.MAIN_SCENE_INITIALIZED);

    }

    public loop(): void {

    }

    static getRendererOptions(): IRendererOptionsAuto {
        return {
            autoDensity: true,
            // backgroundAlpha: 1,
            backgroundColor: 0xffffff
        }
    }
}

export interface ISceneSize {
    width: number;
    height: number;
}
