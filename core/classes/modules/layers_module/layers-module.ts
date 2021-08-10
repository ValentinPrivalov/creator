import {AbstractModule} from "../../../lib/abstract-module";
import {LayersController} from "./controller/layers-controller";
import {LayersView} from "./view/layers-view";
import {Names} from "../../../global/names";

export class LayersModule extends AbstractModule {
    registerControllers(): void {
        super.registerControllers();
        this.addController(Names.Views.SCENES, LayersController);
    }

    registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.SCENES, LayersView);
    }
}
