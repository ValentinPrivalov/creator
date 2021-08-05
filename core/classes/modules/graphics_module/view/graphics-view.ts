import {autoDetectRenderer, Renderer, Container} from "pixi.js";
import {AbstractView} from "../../../../lib/mvc/view";
import {Signals} from "../../../../global/signals";

export class GraphicsView extends AbstractView {
    protected sceneSize: ISceneSize = {width: 1280, height: 720};

    public create(): void {
        const renderer: Renderer = autoDetectRenderer(this.getRendererOptions());
        renderer.view.id = "game";
        document.getElementById('gameFrame').appendChild(renderer.view);

        const stage = new Container();
        stage.name = this.configs.GAME_NAME;

        this.ticker.add(() => this.loop(renderer, stage));
        this.sceneManager.renderer = renderer;
        this.sceneManager.stage = stage;
        this.sceneManager.sceneSize = this.sceneSize;
        this.raiseSignal(Signals.MAIN_SCENE_INITIALIZED);
    }

    public loop(renderer: Renderer, stage: Container): void {
        renderer.render(stage);
    }

    private getRendererOptions(): {} {
        return {
            ...this.sceneSize,
            autoDensity: true,
            backgroundColor: 0xffffff
        }
    }
}

export interface ISceneSize {
    width: number;
    height: number;
}
