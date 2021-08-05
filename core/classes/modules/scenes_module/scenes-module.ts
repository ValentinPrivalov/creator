import {AbstractModule} from "../../../lib/abstract-module";
import {ScenesController} from "./controller/scenes-controller";
import {ScenesView} from "./view/scenes-view";

export class ScenesModule extends AbstractModule {
    registerControllers() {
        super.registerControllers();
        this.addController('123', ScenesController);
    }

    registerViews() {
        super.registerViews();
        this.addView('123', ScenesView);
    }
}
