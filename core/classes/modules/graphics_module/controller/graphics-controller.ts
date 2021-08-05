import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {Signals} from "../../../../global/signals";
import {GraphicsView} from "../view/graphics-view";

export class GraphicsController extends AbstractController {
    get view(): GraphicsView {
        return this._view as GraphicsView;
    }

    addNotificationListeners() {
        super.addNotificationListeners();
        this.addNotificationListener(Notifications.INIT_ENGINE, this.onInitEngine.bind(this));
    }

    addSignalListeners() {
        super.addSignalListeners();
        this.addSignalListener(Signals.MAIN_SCENE_INITIALIZED, this.onMainSceneInitialized.bind(this));
    }

    protected onInitEngine(): void {
        this.view.create();
    }

    protected onMainSceneInitialized(): void {
        this.sendNotification(Notifications.MAIN_SCENE_INITIALIZED);
    }
}
