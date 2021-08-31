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
import {States} from "../../../../global/states";

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

    protected registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(States.LOADING, this.loadMaps.bind(this));
        this.addNotificationListener(Notifications.MAIN_SCENE_CREATED, this.loadAssets.bind(this));
    }

    protected registerSignalListeners(): void {
        super.registerSignalListeners();
        this.addSignalListener(Signals.ASSET_LOADED, this.onAssetLoaded.bind(this));
        this.addSignalListener(Signals.LOAD_PROGRESS, this.onLoadProgress.bind(this));
    }

    protected loadMaps(): void {
        this.model.loadMaps().then((maps: Collection<IMapData>) => {
            this.sendNotification(Notifications.SCENES_LOADED, maps);
        });
    }

    protected loadAssets(): void {
        this.view.showLayer();
        this.model.loadAssets().then(() => {
            this.view.layerTransitionOutStart();
            this.setState(States.MAIN_MENU);
        });
    }

    protected onAssetLoaded(notification: IEventData): void {
        this.sendNotification(Notifications.ASSET_LOADED, notification.body);
    }

    protected onLoadProgress(notification: IEventData): void {
        this.view.showProgress(notification.body);
    }
}
