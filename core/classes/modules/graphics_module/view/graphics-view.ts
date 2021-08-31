import {autoDetectRenderer, Renderer, Container, settings} from "pixi.js";
import {AbstractView} from "../../../../lib/mvc/view";
import {Signals} from "../../../../global/signals";
import {ISceneSize} from "../static/graphics-interfaces";
import {Names} from "../../../../global/names";
import {GraphicsModel} from "../model/graphics-model";

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
        this.setupSettings();
        this.resize();
    }

    protected loop(renderer: Renderer, stage: Container): void {
        renderer.render(stage);
    }

    public resize(): void {
        const {innerWidth, innerHeight} = window;
        const graphicsModel: GraphicsModel = this.getModel(Names.Views.MAIN_SCENE);
        const sceneSize: ISceneSize = graphicsModel.getData();

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
            backgroundColor: 0x000000
        }
    }

    protected setupSettings(): void {
        settings.SORTABLE_CHILDREN = true;
        settings.RESOLUTION = window.devicePixelRatio;
        settings.ROUND_PIXELS = true;
    }
}
