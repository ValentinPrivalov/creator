import {TanksLevelView} from "../view/tanks-level-view";
import {TanksStates} from "../../global/tanks-states";
import {ITanksLevelData, TanksLevelModel} from "../model/tanks-level-model";
import {AbstractController} from "../../../../../core/lib/mvc/controller";
import {TanksLevelSignals} from "../global/tanks-level-signals";
import {States} from "../../../../../core/global/states";
import {Notifications} from "../../../../../core/global/notifications";
import {
    IWindowEventData,
    IWindowMouseWheelEventData
} from "../../../../../core/classes/modules/setup_module/static/setup-interfaces";
import {WindowEventNames} from "../../../../../core/classes/modules/setup_module/static/window-event-names";

export class TanksLevelController extends AbstractController {
    get view(): TanksLevelView {
        return this._view as TanksLevelView;
    }

    get model(): TanksLevelModel {
        return this._model as TanksLevelModel;
    }

    public onRegister() {
        super.onRegister();
        const windowEvent: IWindowEventData = {
            eventName: WindowEventNames.MOUSE_WHEEL,
            handler: this.onMouseWheel.bind(this),
            states: [TanksStates.LEVEL]
        };
        this.sendNotification(Notifications.REGISTER_WINDOW_EVENT, windowEvent);
    }

    protected registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(States.MAIN_MENU, this.showLevel.bind(this));
        this.addNotificationListener(TanksStates.LEVEL, this.initLevel.bind(this));
    }

    protected registerSignalListeners(): void {
        super.registerSignalListeners();
        this.addSignalListener(TanksLevelSignals.PAUSE_GAME, this.stopLevel.bind(this));
    }

    protected showLevel(): void {
        const levelData: ITanksLevelData = this.model.getData();
        this.view.layerTransitionInStart();
        this.view.insertLevel(levelData.currentLevel);
        this.view.setupLevel();
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

    protected onMouseWheel(data: IWindowMouseWheelEventData): void {
        this.view.onZoom(data);
    }
}
