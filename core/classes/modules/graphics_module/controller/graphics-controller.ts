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
import {IWindowEventData} from "../../setup_module/static/setup-interfaces";
import {WindowEventNames} from "../../setup_module/static/window-event-names";

export class GraphicsController extends AbstractController {
    get view(): GraphicsView {
        return this._view as GraphicsView;
    }

    get model(): GraphicsModel {
        return this._model as GraphicsModel;
    }

    public onRegister() {
        super.onRegister();
        this.sendNotification(Notifications.REGISTER_WINDOW_EVENT, {
            eventName: WindowEventNames.RESIZE,
            handler: this.onWindowResized.bind(this),
            allStates: true
        } as IWindowEventData);
    }

    protected registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.SCENES_LOADED, this.onScenesLoaded.bind(this));
    }

    protected registerSignalListeners(): void {
        super.registerSignalListeners();
        this.addSignalListener(Signals.RESIZE, this.sceneResized.bind(this));
    }

    protected onScenesLoaded(notification: IEventData): void {
        const maps: Collection<IMapData> = notification.body;
        const sceneData: ISceneData = maps.get(LoadingNames.SCENE).sceneData;
        const sceneSize: ISceneSize = this.model.setSceneSize(sceneData);
        this.view.create(sceneSize);
        this.sendNotification(Notifications.MAIN_SCENE_INITIALIZED, maps);
    }

    protected onWindowResized(): void {
        this.view.resize();
    }

    protected sceneResized(): void {
        this.sendNotification(Notifications.RESIZE);
    }
}
