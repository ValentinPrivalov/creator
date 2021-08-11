import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {Signals} from "../../../../global/signals";
import {GraphicsView} from "../view/graphics-view";
import {GraphicsModel} from "../model/graphics-model";
import {ISceneSize} from "../static/graphics-interfaces";
import {IEventData} from "../../../../lib/services/event-manager";
import {IAssets} from "../../loading_module/model/loading-model";

export class GraphicsController extends AbstractController {
    get view(): GraphicsView {
        return this._view as GraphicsView;
    }

    get model(): GraphicsModel {
        return this._model as GraphicsModel;
    }

    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.SCENES_LOADED, this.onScenesLoaded.bind(this));
    }

    registerSignalListeners(): void {
        super.registerSignalListeners();
        this.addSignalListener(Signals.MAIN_SCENE_INITIALIZED, this.onMainSceneInitialized.bind(this));
        this.addSignalListener(Signals.RESIZE, this.resize.bind(this));
    }

    protected onScenesLoaded(notification: IEventData): void {
        const assets: IAssets = notification.body;
        const sceneSize: ISceneSize = this.model.setSceneSize(assets.scene);
        this.view.create(sceneSize);
    }

    protected onMainSceneInitialized(): void {
        this.sendNotification(Notifications.MAIN_SCENE_INITIALIZED);
    }

    protected resize(): void {
        this.sendNotification(Notifications.RESIZE);
    }
}
