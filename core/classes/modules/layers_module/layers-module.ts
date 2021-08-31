import {AbstractModule} from "../../../lib/mvc/module";
import {LayersController} from "./controller/layers-controller";
import {LayersView} from "./view/layers-view";
import {Names} from "../../../global/names";

export class LayersModule extends AbstractModule {
    protected registerControllers(): void {
        super.registerControllers();
        this.addController(Names.Views.SCENE, LayersController);
    }

    protected registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.SCENE, LayersView);
    }
}
