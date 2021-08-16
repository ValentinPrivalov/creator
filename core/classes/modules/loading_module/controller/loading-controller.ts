import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {LoadingView} from "../view/loading-view";
import {LoadingModel} from "../model/loading-model";
import {Names} from "../../../../global/names";
import {GraphicsModel} from "../../graphics_module/model/graphics-model";
import {Collection} from "../../../../util/collection";
import {IMapData} from "../static/loading-interfaces";
import {Signals} from "../../../../global/signals";
import {IEventData} from "../../../../lib/services/event-manager";

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
        this.addNotificationListener(Notifications.INIT_ENGINE, this.loadMaps.bind(this));
        this.addNotificationListener(Notifications.MAIN_SCENE_CREATED, this.loadAssets.bind(this));
    }

    registerSignalListeners() {
        super.registerSignalListeners();
        this.addSignalListener(Signals.ASSET_LOADED, this.resourceLoaded.bind(this));
    }

    protected loadMaps(): void {
        this.model.loadMaps().then((maps: Collection<IMapData>) => {
            this.sendNotification(Notifications.SCENES_LOADED, maps);
        });
    }

    protected loadAssets(): void {
        this.model.loadAssets().then((assets: Collection<IMapData>) => {
            this.sendNotification(Notifications.ASSETS_LOADED, assets);
            this.view.drawTestRect();
        });
    }

    protected resourceLoaded(notification: IEventData): void {
        this.sendNotification(Notifications.ASSET_LOADED, notification.body);
    }
}
