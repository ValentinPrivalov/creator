import {AbstractModule} from "../../../lib/abstract-module";
import {LayersController} from "./controller/layers-controller";
import {LayersView} from "./view/layers-view";
import {Names} from "../../../global/names";

export class LayersModule extends AbstractModule {
    registerControllers() {
        super.registerControllers();
        this.addController(Names.Views.SCENES, LayersController);
    }

    registerViews() {
        super.registerViews();
        this.addView(Names.Views.SCENES, LayersView);
    }
}
