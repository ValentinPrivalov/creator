import {AbstractModule} from "../../../lib/abstract-module";
import {GraphicsView} from "./view/graphics-view";
import {Names} from "../../../global/names";
import {GraphicsController} from "./controller/graphics-controller";
import {GraphicsModel} from "./model/graphics-model";

export class GraphicsModule extends AbstractModule {
    registerModels() {
        super.registerModels();
        this.addModel(Names.Views.MAIN_SCENE, GraphicsModel);
    }

    registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.MAIN_SCENE, GraphicsView);
    }

    registerControllers() {
        super.registerControllers();
        this.addController(Names.Views.MAIN_SCENE, GraphicsController);
    }
}
