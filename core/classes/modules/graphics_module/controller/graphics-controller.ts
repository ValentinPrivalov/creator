import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {Signals} from "../../../../global/signals";
import {GraphicsView} from "../view/graphics-view";
import {GraphicsModel} from "../model/graphics-model";
import {ISceneSize} from "../static/graphics-interfaces";

export class GraphicsController extends AbstractController {
    get view(): GraphicsView {
        return this._view as GraphicsView;
    }

    get model(): GraphicsModel {
        return this._model as GraphicsModel;
    }

    registerNotificationListeners() {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.SCENES_LOADED, this.onScenesLoaded.bind(this));
    }

    registerSignalListeners() {
        super.registerSignalListeners();
        this.addSignalListener(Signals.MAIN_SCENE_INITIALIZED, this.onMainSceneInitialized.bind(this));
    }

    protected onScenesLoaded(): void {
        const sceneSize: ISceneSize = this.model.getSceneSize();
        this.view.create(sceneSize);
    }

    protected onMainSceneInitialized(): void {
        this.sendNotification(Notifications.MAIN_SCENE_INITIALIZED);
    }
}
