import {AbstractModule} from "../../../lib/abstract-module";
import {Names} from "../../../global/names";
import {LevelController} from "./controller/level-controller";
import {LevelView} from "./view/level-view";

export class LevelModule extends AbstractModule {
    registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.LEVEL, LevelView);
    }

    registerControllers(): void {
        super.registerControllers();
        this.addController(Names.Views.LEVEL, LevelController);
    }
}
