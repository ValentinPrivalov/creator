import {TanksLevelView} from "../view/tanks-level-view";
import {TanksStates} from "../../global/tanks-states";
import {ITanksLevelData, TanksLevelModel} from "../model/tanks-level-model";
import {AbstractController} from "../../../../../core/lib/mvc/controller";
import {TanksLevelSignals} from "../global/tanks-level-signals";
import {States} from "../../../../../core/global/states";

export class TanksLevelController extends AbstractController {
    get view(): TanksLevelView {
        return this._view as TanksLevelView;
    }

    get model(): TanksLevelModel {
        return this._model as TanksLevelModel;
    }

    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(States.MAIN_MENU, this.showLevel.bind(this));
        this.addNotificationListener(TanksStates.LEVEL, this.initLevel.bind(this));
    }

    registerSignalListeners(): void {
        super.registerSignalListeners();
        this.addSignalListener(TanksLevelSignals.PAUSE_GAME, this.stopLevel.bind(this));
    }

    protected showLevel(): void {
        const levelData: ITanksLevelData = this.model.getData();
        this.view.layerTransitionInStart();
        this.view.insertLevel(levelData.currentLevel);
    }

    protected initLevel(): void {
        this.view.enableInteractive();
        this.view.showInterface();
    }

    protected stopLevel(): void {
        this.view.disableInteractive();
        this.view.hideInterface();
        this.setState(TanksStates.PAUSE_GAME);
    }
}
