import {AbstractController} from "../../../../../core/lib/mvc/controller";
import {Notifications} from "../../../../../core/global/notifications";
import {States} from "../../../../../core/global/states";
import {MenuView} from "../view/menu-view";

export class MenuController extends AbstractController {
    get view(): MenuView {
        return this._view as MenuView;
    }

    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.ASSETS_LOADED, this.onAssetsLoaded.bind(this));
    }

    protected onAssetsLoaded(): void {
        this.view.showLayer();
        this.view.enableUI();
        this.setState(States.MAIN_MENU);
    }
}
