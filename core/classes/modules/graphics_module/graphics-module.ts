import {AbstractModule} from "../../../lib/abstract-module";
import {MainScene} from "./view/main-scene";
import {Names} from "../../../global/names";
import {GraphicsController} from "./controller/graphics-controller";

export class GraphicsModule extends AbstractModule {
    protected pixiScene: MainScene;

    registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.MAIN_SCENE, MainScene);
    }

    registerControllers() {
        super.registerControllers();
        this.addController(Names.Views.MAIN_SCENE, GraphicsController);
    }
}
