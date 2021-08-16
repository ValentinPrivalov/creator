import {autoDetectRenderer, Renderer, Container} from "pixi.js";
import {AbstractView} from "../../../../lib/mvc/view";
import {Signals} from "../../../../global/signals";
import {ISceneSize} from "../static/graphics-interfaces";
import {Names} from "../../../../global/names";
import {GraphicsModel} from "../model/graphics-model";
import {WindowEventNames} from "../../../../lib/services/window-events";

export class GraphicsView extends AbstractView {
    static viewID: string = 'game';
    static containerID: string = 'gameFrame';

    public create(sceneSize: ISceneSize): void {
        const renderer: Renderer = autoDetectRenderer(GraphicsView.getRendererOptions(sceneSize));
        renderer.view.id = GraphicsView.viewID;
        document.getElementById(GraphicsView.containerID).appendChild(renderer.view);

        const stage: Container = new Container();
        stage.name = this.configs.GAME_NAME;

        this.ticker.add(() => this.loop(renderer, stage));
        this.sceneManager.renderer = renderer;
        this.sceneManager.stage = stage;
        this.resize();
        this.windowEvents.add(WindowEventNames.RESIZE, this.resize.bind(this));
    }

    protected loop(renderer: Renderer, stage: Container): void {
        renderer.render(stage);
    }

    protected resize(): void {
        const {innerWidth, innerHeight} = window;
        const graphicsModel: GraphicsModel = this.getModel(Names.Views.MAIN_SCENE);
        const sceneSize: ISceneSize = graphicsModel.getSceneSize();

        const ratio: number = sceneSize.width / sceneSize.height;
        const windowRatio: number = innerWidth / innerHeight;
        const scale: number = windowRatio < ratio ?
            innerWidth / sceneSize.width :
            innerHeight / sceneSize.height;

        this.sceneManager.renderer.resize(sceneSize.width * scale, sceneSize.height * scale);
        this.sceneManager.stage.scale.set(scale);
        this.raiseSignal(Signals.RESIZE);
    }

    private static getRendererOptions(sceneSize: ISceneSize): any {
        return {
            width: sceneSize.width,
            height: sceneSize.height,
            autoDensity: true,
            backgroundColor: 0xffffff
        }
    }
}
