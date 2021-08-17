import {AbstractController} from "../../../../../core/lib/mvc/controller";
import {Notifications} from "../../../../../core/global/notifications";
import {States} from "../../../../../core/global/states";

export class MenuController extends AbstractController {
    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.ASSETS_LOADED, this.onAssetsLoaded.bind(this));
    }

    protected onAssetsLoaded(): void {
        this.view.showLayer();
        this.setState(States.MAIN_MENU);
    }
}
