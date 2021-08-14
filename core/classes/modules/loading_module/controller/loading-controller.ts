import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {LoadingView} from "../view/loading-view";
import {LoadingModel} from "../model/loading-model";
import {Names} from "../../../../global/names";
import {GraphicsModel} from "../../graphics_module/model/graphics-model";
import {Collection} from "../../../../util/collection";
import {IMapData} from "../static/loading-interfaces";

export class LoadingController extends AbstractController {
    protected graphicsModel: GraphicsModel;

    get view(): LoadingView {
        return this._view as LoadingView;
    }

    get model(): LoadingModel {
        return this._model as LoadingModel;
    }

    constructor(name: string) {
        super(name);
        this.graphicsModel = this.getModel(Names.Views.MAIN_SCENE) as GraphicsModel;
    }

    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.INIT_ENGINE, this.loadAssets.bind(this));
    }

    protected loadAssets(): void {
        this.model.loadAssets().then((assets: Collection<IMapData>) => {
            this.sendNotification(Notifications.SCENES_LOADED, assets);
            this.view.drawTestRect();
        });
    }
}
