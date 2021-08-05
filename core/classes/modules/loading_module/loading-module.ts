import {AbstractModule} from "../../../lib/abstract-module";
import {LoadingController} from "./controller/loading-controller";
import {Names} from "../../../global/names";
import {LoadingView} from "./view/loading-view";
import {LoadingModel} from "./model/loading-model";

export class LoadingModule extends AbstractModule {
    registerModels(): void {
        super.registerModels();
        this.addModel(Names.Views.LOADING_SCREEN, LoadingModel);
    }

    registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.LOADING_SCREEN, LoadingView);
    }

    registerControllers(): void {
        super.registerControllers();
        this.addController(Names.Views.LOADING_SCREEN, LoadingController);
    }
}
