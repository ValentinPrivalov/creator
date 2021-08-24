import {AbstractModule} from "../../../lib/mvc/module";
import {GraphicsView} from "./view/graphics-view";
import {Names} from "../../../global/names";
import {GraphicsController} from "./controller/graphics-controller";
import {GraphicsModel} from "./model/graphics-model";
import * as PIXI from "pixi.js";
window.PIXI = PIXI; // pixiJS devtools dependence

export class GraphicsModule extends AbstractModule {
    registerModels(): void {
        super.registerModels();
        this.addModel(Names.Views.MAIN_SCENE, GraphicsModel);
    }

    registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.MAIN_SCENE, GraphicsView);
    }

    registerControllers(): void {
        super.registerControllers();
        this.addController(Names.Views.MAIN_SCENE, GraphicsController);
    }
}
