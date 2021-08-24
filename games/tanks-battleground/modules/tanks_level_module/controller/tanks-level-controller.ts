import {TanksLevelView} from "../view/tanks-level-view";
import {TanksStates} from "../../global/tanks-states";
import {ITanksLevelData, TanksLevelModel} from "../model/tanks-level-model";
import {Notifications} from "../../../../../core/global/notifications";
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
        this.addNotificationListener(TanksStates.LEVEL, this.initLevel.bind(this));
        this.addNotificationListener(Notifications.ASSETS_LOADED, this.onSceneCreated.bind(this));
    }

    protected onSceneCreated(): void {
        const levelData: ITanksLevelData = this.model.getData();
        this.view.showLayer();
        this.view.insertLevel(levelData.currentLevel);
    }

    protected initLevel(): void {
        this.view.enableUI();
    }
}
