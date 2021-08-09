import {autoDetectRenderer, Renderer, Container} from "pixi.js";
import {AbstractView} from "../../../../lib/mvc/view";
import {Signals} from "../../../../global/signals";
import {ISceneSize} from "../static/graphics-interfaces";

export class GraphicsView extends AbstractView {
    static viewID: string = 'game';

    public create(sceneSize: ISceneSize): void {
        const renderer: Renderer = autoDetectRenderer(this.getRendererOptions(sceneSize));
        renderer.view.id = GraphicsView.viewID;
        document.getElementById('gameFrame').appendChild(renderer.view);

        const stage = new Container();
        stage.name = this.configs.GAME_NAME;

        this.ticker.add(() => this.loop(renderer, stage));
        this.sceneManager.renderer = renderer;
        this.sceneManager.stage = stage;
        this.raiseSignal(Signals.MAIN_SCENE_INITIALIZED);
    }

    public loop(renderer: Renderer, stage: Container): void {
        renderer.render(stage);
    }

    private getRendererOptions(sceneSize: ISceneSize): any {
        return {
            width: sceneSize.width,
            height: sceneSize.height,
            autoDensity: true,
            backgroundColor: 0xffffff
        }
    }
}
