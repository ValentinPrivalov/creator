import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {Signals} from "../../../../global/signals";
import {GraphicsView} from "../view/graphics-view";

export class GraphicsController extends AbstractController {
    get view(): GraphicsView {
        return this._view as GraphicsView;
    }

    registerNotificationListeners() {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.INIT_ENGINE, this.onInitEngine.bind(this));
    }

    registerSignalListeners() {
        super.registerSignalListeners();
        this.addSignalListener(Signals.MAIN_SCENE_INITIALIZED, this.onMainSceneInitialized.bind(this));
    }

    protected onInitEngine(): void {
        this.view.create();
    }

    protected onMainSceneInitialized(): void {
        this.sendNotification(Notifications.MAIN_SCENE_INITIALIZED);
    }
}
