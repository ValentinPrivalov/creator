import {AbstractModule} from "../../../lib/abstract-module";
import {ScenesController} from "./controller/scenes-controller";
import {ScenesView} from "./view/scenes-view";
import {Names} from "../../../global/names";

export class ScenesModule extends AbstractModule {
    registerControllers() {
        super.registerControllers();
        this.addController(Names.Views.SCENES, ScenesController);
    }

    registerViews() {
        super.registerViews();
        this.addView(Names.Views.SCENES, ScenesView);
    }
}
