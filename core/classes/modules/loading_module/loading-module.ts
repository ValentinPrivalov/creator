import {AbstractModule} from "../../../lib/abstract-module";
import {LoadingController} from "./controller/loading-controller";
import {Names} from "../../../global/names";
import {LoadingView} from "./view/loading-view";

export class LoadingModule extends AbstractModule {
    registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.LOADING_SCREEN, LoadingView);
    }

    registerControllers(): void {
        super.registerControllers();
        this.addController(Names.Views.LOADING_SCREEN, LoadingController);
    }
}
