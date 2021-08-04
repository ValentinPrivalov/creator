import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {LoadingView} from "../view/loading-view";

export class LoadingController extends AbstractController {
    get view(): LoadingView {
        return this.viewComponent as LoadingView;
    }

    addNotificationListeners() {
        super.addNotificationListeners();
        this.addNotificationListener(Notifications.MAIN_SCENE_INITIALIZED, this.onMainSceneInitialized.bind(this));
    }

    protected onMainSceneInitialized(): void {
        this.view.doSomething();
    }
}
