import {AbstractController} from "../../../../lib/mvc/controller";
import {LevelView} from "../view/level-view";
import {Notifications} from "../../../../global/notifications";

export class LevelController extends AbstractController {
    protected static LEVEL_1: string = 'LEVEL_1';

    get view(): LevelView {
        return this._view as LevelView;
    }

    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.ASSETS_LOADED, this.onSceneCreated.bind(this));
    }

    protected onSceneCreated(): void {
        this.view.insertLevel(LevelController.LEVEL_1);
    }
}
