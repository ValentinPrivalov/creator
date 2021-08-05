import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {LoadingView} from "../view/loading-view";
import {LoadingModel} from "../model/loading-model";

export class LoadingController extends AbstractController {
    get view(): LoadingView {
        return this._view as LoadingView;
    }

    get model(): LoadingModel {
        return this._model as LoadingModel;
    }

    registerNotificationListeners() {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.MAIN_SCENE_INITIALIZED, this.onMainSceneInitialized.bind(this));
    }

    protected onMainSceneInitialized(): void {
        this.model.loadScene().then(data => {
            this.sendNotification(Notifications.SCENES_LOADED, data);
        });
        this.view.doSomething();
    }
}
