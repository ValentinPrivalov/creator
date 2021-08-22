import {LevelModule} from "../../../../core/classes/modules/level_module/level-module";
import {TanksLevelView} from "./view/tanks-level-view";
import {TanksLevelController} from "./controller/tanks-level-controller";
import {Names} from "../../../../core/global/names";
import {TanksLevelModel} from "./model/tanks-level-model";

export class TanksLevelModule extends LevelModule {
    registerModels() {
        super.registerModels();
        this.addModel(Names.Views.LEVEL, TanksLevelModel);
    }

    registerViews(): void {
        super.registerViews();
        this.replaceView(Names.Views.LEVEL, TanksLevelView);
    }

    registerControllers(): void {
        super.registerControllers();
        this.addController(Names.Views.LEVEL, TanksLevelController);
    }
}
