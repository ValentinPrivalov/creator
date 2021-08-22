import {TanksLevelView} from "../view/tanks-level-view";
import {TanksStates} from "../../global/tanks-states";
import {TanksLevelModel} from "../model/tanks-level-model";
import {Notifications} from "../../../../../core/global/notifications";
import {TanksLevelNames} from "../global/tanks-level-names";
import {AbstractController} from "../../../../../core/lib/mvc/controller";

export class TanksLevelController extends AbstractController {
    get view(): TanksLevelView {
        return this._view as TanksLevelView;
    }

    get model(): TanksLevelModel {
        return this._model as TanksLevelModel;
    }

    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.ASSETS_LOADED, this.onSceneCreated.bind(this));
    }

    protected onSceneCreated(): void {
        this.view.showLayer();
        this.view.insertLevel(TanksLevelNames.LEVEL_1);
    }

    protected onStateChanged(current: string, previous?: string) {
        super.onStateChanged(current, previous);
        if (current === TanksStates.LEVEL) {
            this.view.enableUI();
        }
    }
}
