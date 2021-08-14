import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {Signals} from "../../../../global/signals";
import {GraphicsView} from "../view/graphics-view";
import {GraphicsModel} from "../model/graphics-model";
import {ISceneSize} from "../static/graphics-interfaces";
import {IEventData} from "../../../../lib/services/event-manager";
import {Collection} from "../../../../util/collection";
import {LoadingNames} from "../../loading_module/static/loading-names";
import {ISceneData} from "../../../../lib/tiled/tiled-interfaces";
import {IMapData} from "../../loading_module/static/loading-interfaces";

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
        const assets: Collection<IMapData> = notification.body;
        const sceneData: ISceneData = assets.get(LoadingNames.SCENE).sceneData;
        const sceneSize: ISceneSize = this.model.setSceneSize(sceneData);
        this.view.create(sceneSize);
    }

    protected onMainSceneInitialized(): void {
        this.sendNotification(Notifications.MAIN_SCENE_INITIALIZED);
    }

    protected resize(): void {
        this.sendNotification(Notifications.RESIZE);
    }
}
